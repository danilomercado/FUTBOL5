const prisma = require("../lib/prisma");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    const validRoles = ["USER", "ADMIN", "SYSADMIN"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return res.json({
      message: "Rol actualizado correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar rol",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
};
