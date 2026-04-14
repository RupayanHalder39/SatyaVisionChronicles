type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">SatyaVision Chronicles</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-slate-600 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
