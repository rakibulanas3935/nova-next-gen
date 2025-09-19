"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "To Get Started You Need to Join as a Member",
description = "You must become a member to access this project. Would you like to join now?"
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#05010e] via-[#0a041f] to-[#05010e] border border-white/10 text-text-body p-6 shadow-xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 cursor-pointer right-3 text-text-body hover:text-accent-pink transition"
            >
              <X size={20} />
            </button>

            {/* Title + Description */}
            <h2 className="text-xl font-semibold mb-2 text-text-title">{title}</h2>
            <p className="text-sm text-text-body mb-6">{description}</p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 cursor-pointer rounded-md bg-brand-primary hover:bg-brand-primary transition text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className=" cursor-pointer bg-accent-pink hover:bg-brand-secondary  font-medium inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
