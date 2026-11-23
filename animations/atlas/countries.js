import * as THREE from "three";

const shortNames = {
  USA: "United States",
  COD: "DR Congo",
  CAF: "Central African Rep.",
  ARE: "UAE",
  BIH: "Bosnia & Herz.",
  DOM: "Dominican Rep.",
  COG: "Congo",
  SLB: "Solomon Is.",
  CYN: "N. Cyprus",
  GNQ: "Eq. Guinea",
};

const aliases = {
  USA: "usa|us|america",
  GBR: "uk|britain|england|great britain",
  ARE: "uae|dubai|abu dhabi",
  NLD: "holland",
  CZE: "czech republic",
  MMR: "burma",
  MKD: "macedonia",
  SWZ: "swaziland",
  COD: "drc|congo",
  KOR: "korea",
  RUS: "russian federation",
};

export function buildCountries(geojson, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.imageSmoothingEnabled = false;

  const countries = [null];
  for (const { properties, geometry } of geojson.features) {
    if (!geometry || !["Polygon", "MultiPolygon"].includes(geometry.type))
      continue;
    const id = countries.length;
    const { NAME, ADM0_A3: iso3, LABEL_X: lon, LABEL_Y: lat } = properties;
    countries.push({
      id,
      iso3,
      name: shortNames[iso3] ?? NAME,
      original: NAME,
      lon,
      lat,
    });
    const polygons =
      geometry.type === "Polygon"
        ? [geometry.coordinates]
        : geometry.coordinates;
    context.fillStyle = `rgb(${id},0,0)`;
    for (const polygon of polygons) {
      context.beginPath();
      for (const ring of polygon) {
        ring.forEach(([lng, latitude], index) => {
          const x = ((lng + 180) / 360) * width;
          const y = ((90 - latitude) / 180) * height;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
      }
      context.fill("evenodd");
    }
  }

  const pixels = context.getImageData(0, 0, width, height).data;
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  const sorted = countries
    .slice(1)
    .sort((a, b) => a.name.localeCompare(b.name));
  const votes = new Uint8Array(countries.length);
  const idAt = (x, y) =>
    pixels[
      (Math.max(0, Math.min(y, height - 1)) * width + ((x + width) % width)) * 4
    ];

  function pick(u, v) {
    const x = Math.floor(u * width);
    const y = Math.min(height - 1, Math.floor((1 - v) * height));
    const center = idAt(x, y);
    votes.fill(0);
    let winner = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const id = idAt(x + dx, y + dy);
        if (id && id < votes.length && ++votes[id] > votes[winner]) winner = id;
      }
    }
    return countries[
      votes[center] >= 2 ? center : votes[winner] >= 2 ? winner : 0
    ];
  }

  function search(query) {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return sorted
      .map((country) => {
        const fields = [
          country.name,
          country.original,
          country.iso3,
          ...(aliases[country.iso3] ?? "").split("|"),
        ];
        const rank = Math.min(
          ...fields.map((field) => {
            const value = field.toLowerCase();
            return value === term
              ? 0
              : value.startsWith(term)
                ? 1
                : value.includes(term)
                  ? 2
                  : 3;
          }),
        );
        return { country, rank };
      })
      .filter((result) => result.rank < 3)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 7)
      .map((result) => result.country);
  }

  return { texture, pick, search };
}

export function oceanName(lon, lat) {
  if (lat > 66) return "Arctic Ocean";
  if (lat < -58) return "Southern Ocean";
  if (lat < 27 && lon > 22 && lon < 132) return "Indian Ocean";
  if (lon > -78 && lon < 22) return "Atlantic Ocean";
  return "Pacific Ocean";
}
