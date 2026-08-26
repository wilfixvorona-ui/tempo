export default async function handler(req, res) {
  const { start, end } = req.query;
  const key = process.env.ORS_KEY;
  const r = await fetch(
    `https://api.heigit.org/v2/directions/driving-hgv?api_key=${key}&start=${start}&end=${end}`
  );
  res.status(200).json(await r.json());
}