//CRUD operations for product
export const create = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    if (!data) {
      return res.status(404).json({ message: "Create product failed" });
    }
    return res.status(200).json({
      message: "Create product successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const read = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Get product successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
