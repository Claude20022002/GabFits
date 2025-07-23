const Payment = require("../models/paymentModel");

exports.createPayment = async (req, res) => {
    try {
        const { userId, courseId, amount, paymentMethod } = req.body;

        // Validate input
        if (!userId || !courseId || !amount || !paymentMethod) {
            return res
                .status(400)
                .json({ message: "Tous les champs sont requis." });
        }

        const newPayment = new Payment({
            userId,
            courseId,
            amount,
            paymentMethod,
        });

        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        console.error("Erreur lors de la création du paiement:", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
exports.getPaymentsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate userId
        if (!userId) {
            return res
                .status(400)
                .json({ message: "L'ID utilisateur est requis." });
        }

        const payments = await Payment.find({ userId }).populate(
            "courseId",
            "title"
        );

        if (payments.length === 0) {
            return res
                .status(404)
                .json({
                    message: "Aucun paiement trouvé pour cet utilisateur.",
                });
        }

        res.status(200).json(payments);
    } catch (error) {
        console.error("Erreur lors de la récupération des paiements:", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
exports.getPaymentDetails = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;

        // Validate paymentId
        if (!paymentId) {
            return res
                .status(400)
                .json({ message: "L'ID de paiement est requis." });
        }

        const payment = await Payment.findById(paymentId)
            .populate("userId", "name email")
            .populate("courseId", "title");

        if (!payment) {
            return res.status(404).json({ message: "Paiement non trouvé." });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des détails du paiement:",
            error
        );
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
exports.updatePaymentStatus = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const { status } = req.body;

        // Validate paymentId and status
        if (!paymentId || !status) {
            return res
                .status(400)
                .json({
                    message: "L'ID de paiement et le statut sont requis.",
                });
        }

        const validStatuses = ["pending", "completed", "failed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Statut invalide." });
        }

        const updatedPayment = await Payment.findByIdAndUpdate(
            paymentId,
            { status },
            { new: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ message: "Paiement non trouvé." });
        }

        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour du statut du paiement:",
            error
        );
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
exports.deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;

        // Validate paymentId
        if (!paymentId) {
            return res
                .status(400)
                .json({ message: "L'ID de paiement est requis." });
        }

        const deletedPayment = await Payment.findByIdAndDelete(paymentId);

        if (!deletedPayment) {
            return res.status(404).json({ message: "Paiement non trouvé." });
        }

        res.status(200).json({ message: "Paiement supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du paiement:", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
