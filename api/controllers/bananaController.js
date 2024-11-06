/* import axios from "axios";

export const getBananaQuestion = async (req, res) => {
  try {
    const response = await axios.get(
      "http://marcconrad.com/uob/banana/api.php?out=json"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Banana API" });
  }
}; */
