import { toast } from "react-hot-toast";

/**
 * Custom StayEase AI Toast Helpers matching the dark/glassmorphism UI theme.
 */

export const notifySuccess = (title, subtitle) => {
  if (subtitle) {
    return toast.success(
      <div>
        <div className="font-bold text-white text-sm">{title}</div>
        <div className="text-xs text-slate-300 mt-0.5">{subtitle}</div>
      </div>,
      { id: `${title}-${subtitle}` }
    );
  }
  return toast.success(title);
};

export const notifyError = (title, subtitle) => {
  if (subtitle) {
    return toast.error(
      <div>
        <div className="font-bold text-white text-sm">{title}</div>
        <div className="text-xs text-slate-300 mt-0.5">{subtitle}</div>
      </div>,
      { id: `${title}-${subtitle}` }
    );
  }
  return toast.error(title);
};

export const notifyWarning = (title, subtitle) => {
  return toast(
    <div>
      <div className="font-bold text-amber-300 text-sm">{title}</div>
      {subtitle && <div className="text-xs text-slate-300 mt-0.5">{subtitle}</div>}
    </div>,
    {
      icon: "⚠️",
      style: {
        border: "1px solid rgba(245, 158, 11, 0.35)",
        boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.4)",
      },
    }
  );
};

export { toast };
