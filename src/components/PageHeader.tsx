export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="border-b border-marino/10 bg-white">
      <div className="contenedor py-10 sm:py-14">
        <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-3xl text-xl leading-relaxed text-tinta/80">{intro}</p>}
      </div>
    </section>
  )
}
