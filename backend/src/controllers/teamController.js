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
      return res
        .status(403)
        .json({ message: "No tenés permisos para borrar este jugador" });
    }

    await prisma.player.delete({
      where: { id: playerId },
    });

    return res.json({ message: "Jugador eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar jugador", error: error.message });
  }
};

module.exports = {
  getPlayers,
  createPlayer,
  deletePlayer,
};
