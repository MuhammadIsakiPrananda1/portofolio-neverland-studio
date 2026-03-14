import { Service } from "@/types";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { staggerItem } from "@utils/animations";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = Icons[
    service.icon as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  const colorConfig = {
    primary: {
      iconBg: "bg-dark-800",
      iconColor: "text-purple-400",
      dot: "bg-purple-400",
    },
    secondary: {
      iconBg: "bg-dark-800",
      iconColor: "text-blue-400",
      dot: "bg-blue-400",
    },
    accent: {
      iconBg: "bg-dark-800",
      iconColor: "text-pink-400",
      dot: "bg-pink-400",
    },
  };

  const colors = colorConfig[service.color];

  return (
    <motion.div
      className="relative h-full"
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="rounded-xl p-5 sm:p-6 md:p-8 h-full border border-white/10 bg-dark-800/50">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-lg ${colors.iconBg} mb-6`}>
          {Icon && <Icon className={`w-8 h-8 ${colors.iconColor}`} />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>

        {/* Description */}
        <p className="text-gray-400 mb-6 leading-relaxed text-sm">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Key Features
          </h4>
          <ul className="space-y-2.5">
            {service.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-400 text-sm"
              >
                <span
                  className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${colors.dot}`}
                />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
