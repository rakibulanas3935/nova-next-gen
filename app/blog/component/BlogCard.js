export const BlogCard = ({
    title,
    subtitle,
    date,
    image,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 hover:bg-white/10 transition-all rounded-2xl border border-white/10 shadow-sm hover:shadow-lg overflow-hidden"
    >
        <div className="w-full h-48 overflow-hidden">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
        </div>
        <div className="p-6">
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="text-sm text-gray-300 mt-2">{subtitle}</p>
            <p className="text-xs text-gray-500 mt-4">{date}</p>
        </div>
    </motion.div>
);
