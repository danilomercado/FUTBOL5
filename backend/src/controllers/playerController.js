const prisma = require("../lib/prisma");

const getPlayers = async (req, res) => {
  try {
    const isAdmin = req.user.role === "ADMIN" || req.user.role === "SYSADMIN";

    const players = await prisma.player.findMany({
      where: isAdmin ? {} : { ownerId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return res.json(players);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener jugadores",
      error: error.message,
    });
  }
};

const createPlayer = async (req, res) => {
  try {
    const { personName, skillCount } = req.body;

    const player = await prisma.player.create({
      data: {
        personName,
        skillCount: Number(skillCount),
        ownerId: req.user.id, // 🔥 CLAVE
      },
    });

    console.log("CREANDO PLAYER USER ID:", req.user.id);

    return res.status(201).json(player);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear jugador",
      error: error.message,
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const playerId = Number(req.params.id);

    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    const canDelete =
      player.ownerId === req.user.id ||
      req.user.role === "ADMIN" ||
      req.user.role === "SYSADMIN";

    if (!canDelete) {
      return res.status(403).json({
        message: "No tenés permisos",
      });
    }

    await prisma.player.delete({
      where: { id: playerId },
    });

    return res.json({ message: "Jugador eliminado" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar jugador",
      error: error.message,
    });
  }
};

module.exports = {
  getPlayers,
  createPlayer,
  deletePlayer,
};
