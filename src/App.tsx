import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "./utils/cn";

type SectionLink = {
  id: string;
  label: string;
  submenu?: { id: string; label: string }[];
};

type CounterItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

type ServiceGroup = {
  title: string;
  items: string[];
};

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  size: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  photo: string;
};

const whatsappNumber = "5511999999999";
const whatsappMessage = "Olá, gostaria de agendar um diagnóstico da minha propriedade.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const navLinks: SectionLink[] = [
  { id: "home", label: "Home" },
  { 
    id: "sobre", 
    label: "Sobre",
    submenu: [
      { id: "quem-somos", label: "Quem Somos" },
      { id: "diferenciais", label: "Diferenciais" },
      { id: "processo", label: "Processo" }
    ]
  },
  { 
    id: "servicos", 
    label: "Serviços",
    submenu: [
      { id: "estrategia-gestao", label: "Estratégia e Gestão" },
      { id: "campo-manejo", label: "Campo e Manejo" },
      { id: "tecnologia-precisao", label: "Tecnologia e Precisão" }
    ]
  },
  { id: "galeria", label: "Galeria" },
  { id: "resultados", label: "Resultados" },
  { id: "contato", label: "Contato" },
];

const counters: CounterItem[] = [
  { value: 15000, prefix: "+", label: "ha monitorados" },
  { value: 98, prefix: "+", suffix: "%", label: "Satisfação" },
  { value: 30, prefix: "+", suffix: "%", label: "Ganho médio de eficiência" },
  { value: 500, prefix: "+", label: "Propriedades atendidas" },
];

const strategicPillars = [
  {
    title: "Decisão guiada por dados",
    text: "Transformamos mapas, análises e monitoramento em um plano claro para produzir mais, gastar menos e reduzir riscos.",
  },
  {
    title: "Gestão de rentabilidade",
    text: "Cada hectare é tratado como patrimônio produtivo, com foco em retorno, previsibilidade e eficiência operacional.",
  },
  {
    title: "Legado sustentável",
    text: "Unimos ciência e responsabilidade para fortalecer o solo, a operação e a sucessão das próximas gerações.",
  },
];

const differentiators = [
  {
    title: "Agricultura de Precisão",
    text: "Tecnologia aplicada para enxergar a lavoura em nível de detalhe e agir com mais assertividade.",
  },
  {
    title: "Inteligência Agronômica",
    text: "Leitura técnica do campo, do solo ao clima, com visão consultiva e orientada a resultado.",
  },
  {
    title: "Gestão de Rentabilidade",
    text: "Planejamento que melhora o uso de insumos, custos e eficiência para elevar a margem do produtor.",
  },
  {
    title: "Tecnologia no Campo",
    text: "Integração entre monitoramento, máquinas e dados para operar com mais precisão e menos desperdício.",
  },
  {
    title: "Ciência Aplicada",
    text: "Recomendações fundamentadas em análise, observação e método, sem achismos na tomada de decisão.",
  },
  {
    title: "Sustentabilidade",
    text: "Práticas que preservam produtividade, conservam recursos e valorizam a terra no longo prazo.",
  },
];

const serviceGroups: ServiceGroup[] = [
  {
    title: "Estratégia e Gestão",
    items: [
      "Diagnóstico e Planejamento",
      "Projetos de Crédito Rural",
      "Seguro Agrícola",
      "Gestão Financeira",
      "Análise de Custos",
      "Planejamento Estratégico",
    ],
  },
  {
    title: "Campo e Manejo",
    items: [
      "Monitoramento de Lavouras",
      "Análise de Solo",
      "Calagem",
      "Adubação",
      "Manejo Integrado",
      "Controle Fitossanitário",
      "Rotação de Culturas",
      "Relatórios Técnicos",
    ],
  },
  {
    title: "Tecnologia e Precisão",
    items: [
      "Agricultura de Precisão",
      "Mapas de Fertilidade",
      "Taxa Variável",
      "Georreferenciamento",
      "Treinamentos",
      "Irrigação Inteligente",
      "Máquinas Agrícolas",
    ],
  },
];

const galleryItems: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/34940811/pexels-photo-34940811.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
    alt: "Vista aérea de lavouras verdes em mosaico.",
    title: "Drone sobre lavouras",
    size: "tall",
  },
  {
    src: "https://images.pexels.com/photos/26256446/pexels-photo-26256446.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    alt: "Colheitadeira trabalhando em campo de grãos.",
    title: "Colheita em escala",
    size: "wide",
  },
  {
    src: "https://images.pexels.com/photos/33787003/pexels-photo-33787003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    alt: "Máquinas modernas colhendo em área extensa.",
    title: "Máquinas modernas",
    size: "wide",
  },
  {
    src: "https://images.pexels.com/photos/34182414/pexels-photo-34182414.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
    alt: "Drones agrícolas em operação para monitoramento.",
    title: "Mapas e monitoramento",
    size: "tall",
  },
  {
    src: "https://images.pexels.com/photos/9276463/pexels-photo-9276463.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    alt: "Tratores operando em uma grande área agrícola.",
    title: "Plantio e preparo",
    size: "wide",
  },
  {
    src: "https://images.pexels.com/photos/31953698/pexels-photo-31953698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600",
    alt: "Vista aérea de um vinhedo com trator entre linhas.",
    title: "Gestão de talhões",
    size: "tall",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Nossa produtividade aumentou muito depois da consultoria. A melhor decisão que tomamos foi trabalhar com a TECNOAGRO desde a regulagem do plantio até a colheita.",
    author: "Rafael Shimitashu",
    role: "Produtor rural de Cristalina, GO",
    photo: "https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
  },
  {
    quote:
      "Fechamos parceria em 2025 e, já na entre safra irrigada, ganhamos cerca de 6 sacas a mais por hectare em relação ao ano anterior.",
    author: "Rafael Shimitashu",
    role: "Produtor rural de Cristalina, GO",
    photo: "https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
  },
  {
    quote:
      "Abrimos a mente para novas tecnologias e ganhamos mais eficiência no plantio, menos custo e uma parceria que segue para os próximos anos.",
    author: "Rafael Shimitashu",
    role: "Produtor rural de Cristalina, GO",
    photo: "https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
  },
];

const processSteps = [
  "Diagnóstico",
  "Planejamento",
  "Implantação",
  "Monitoramento",
  "Resultados",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    let raf = 0;
    const start = performance.now();

    const step = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        raf = window.requestAnimationFrame(step);
      }
    };

    raf = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(raf);
  }, [active, duration, target]);

  return value;
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 56 56" fill="none">
      <rect x="4" y="4" width="48" height="48" rx="16" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path
        d="M16 35.5c4.2-11.8 12.2-17.4 24-17.4-4.5 6.2-8.8 9.8-13 10.8 4.4 1 7.7 3 9.8 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 18.5c1.8 2.2 3 4.7 3.6 7.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="39.5" cy="37" r="2.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function ArrowButton({
  label,
  href,
  tone = "gold",
  onClick,
  type = "button",
}: {
  label: string;
  href?: string;
  tone?: "gold" | "green";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[0.22em] transition duration-300 font-button",
    tone === "gold"
      ? "bg-[#C9A227] text-[#13482A] shadow-[0_18px_40px_rgba(201,162,39,0.28)] hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(201,162,39,0.36)]"
      : "border border-white/15 bg-white/6 text-white hover:-translate-y-0.5 hover:border-[#C9A227]/50 hover:bg-white/10",
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        <span>{label}</span>
        <span aria-hidden="true">→</span>
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <motion.div
      className={cn("space-y-4", center && "mx-auto max-w-3xl text-center")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
      }}
    >
      <motion.p className="section-kicker" variants={fadeUp}>
        {eyebrow}
      </motion.p>
      <motion.h2 className="max-w-4xl font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl" variants={fadeUp}>
        {title}
      </motion.h2>
      <motion.p className="max-w-3xl text-base leading-8 text-white/72 md:text-lg" variants={fadeUp}>
        {description}
      </motion.p>
    </motion.div>
  );
}

function GlassPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass-panel", className)}>{children}</div>;
}

function CountItem({ item }: { item: CounterItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.65 });
  const value = useCountUp(item.value, inView);

  return (
    <motion.div
      ref={ref}
      className="glass-panel px-5 py-6 text-center md:px-8"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
    >
      <div className="font-display text-4xl text-white md:text-5xl">
        {item.prefix}
        {new Intl.NumberFormat("pt-BR").format(value)}
        {item.suffix}
      </div>
      <p className="mt-3 text-sm tracking-[0.16em] text-white/72 uppercase">{item.label}</p>
    </motion.div>
  );
}

function Icon({ name }: { name: string }) {
  const common = "h-6 w-6";

  switch (name) {
    case "precision":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "leaf":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M19 5c-6.5 0-12 5.5-12 12 0 1.1.9 2 2 2 6.5 0 12-5.5 12-12 0-1.1-.9-2-2-2Z" />
          <path d="M7 17c4.2-1 7.7-4.5 10-10" strokeLinecap="round" />
        </svg>
      );
    case "chart":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19h16" />
          <path d="M6 16V9" />
          <path d="M12 16V5" />
          <path d="M18 16v-7" />
        </svg>
      );
    case "tractor":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 14h8l2-4h4" />
          <path d="M7 14v3" />
          <circle cx="8" cy="18" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M13 10V7l-2-2" />
        </svg>
      );
    case "science":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3h4" />
          <path d="M12 3v6l5 8a2 2 0 0 1-1.7 3H8.7A2 2 0 0 1 7 17l5-8V3" />
          <path d="M8.5 14h7" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    email: "",
    area: "",
    mensagem: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 65]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const floatingParticles = useMemo(
    () => [
      { top: "12%", left: "9%", size: 9, delay: 0 },
      { top: "20%", left: "76%", size: 11, delay: 1.6 },
      { top: "62%", left: "16%", size: 8, delay: 0.8 },
      { top: "72%", left: "80%", size: 12, delay: 1.1 },
      { top: "40%", left: "50%", size: 7, delay: 2.2 },
    ],
    [],
  );

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    const endpoint = (import.meta as ImportMeta & { env?: { VITE_CONTACT_ENDPOINT?: string } }).env?.VITE_CONTACT_ENDPOINT ?? "/contact.php";
    const payload = new FormData();

    Object.entries(formState).forEach(([key, value]) => payload.append(key, value));

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        throw new Error("request-failed");
      }

      setFormStatus("success");
      setFormState({ nome: "", telefone: "", cidade: "", email: "", area: "", mensagem: "" });
    } catch {
      setFormStatus("error");
      const fallbackText = encodeURIComponent(
        [
          "Olá, gostaria de agendar um diagnóstico da minha propriedade.",
          formState.nome ? `Nome: ${formState.nome}` : null,
          formState.cidade ? `Cidade: ${formState.cidade}` : null,
          formState.area ? `Área cultivada: ${formState.area}` : null,
          formState.mensagem ? `Mensagem: ${formState.mensagem}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      );

      window.open(`https://wa.me/${whatsappNumber}?text=${fallbackText}`, "_blank", "noopener,noreferrer");
    } finally {
      window.setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5F6F7] text-[#1F2933]">
      {/* Header com fundo branco e logo visível */}
      <header className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled 
          ? "border-[#1E6B3A]/10 bg-white/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]" 
          : "border-transparent bg-white"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="TECNOAGRO" 
              className="h-12 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <div 
                key={link.id}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(link.id)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  className="text-sm font-medium tracking-[0.08em] text-[#1F2933] transition hover:text-[#1E6B3A]"
                  href={`#${link.id}`}
                >
                  {link.label}
                </a>
                {link.submenu && (
                  <div className={cn(
                    "absolute left-0 top-full pt-2 transition-all duration-200",
                    activeSubmenu === link.id ? "opacity-100 visible" : "opacity-0 invisible"
                  )}>
                    <div className="min-w-[220px] rounded-2xl bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,0.12)] border border-[#1E6B3A]/10">
                      {link.submenu.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          className="block rounded-xl px-4 py-3 text-sm text-[#1F2933] transition hover:bg-[#1E6B3A]/5 hover:text-[#1E6B3A]"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <ArrowButton label="Falar com Especialista" href={whatsappUrl} tone="gold" />
          </nav>

          <button
            className="inline-flex flex-col items-center justify-center gap-1 rounded-xl border border-[#1E6B3A]/20 bg-white px-4 py-3 text-[#1F2933] transition hover:bg-[#1E6B3A]/5 lg:hidden"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Abrir menu"
          >
            <span className="block h-0.5 w-5 bg-[#1E6B3A]" />
            <span className="block h-0.5 w-5 bg-[#1E6B3A]" />
            <span className="block h-0.5 w-5 bg-[#1E6B3A]" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="border-t border-[#1E6B3A]/10 bg-white px-4 py-5 lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-3">
                {navLinks.map((link) => (
                  <div key={link.id}>
                    <a
                      className="block rounded-xl px-3 py-3 text-base font-medium text-[#1F2933] transition hover:bg-[#1E6B3A]/5 hover:text-[#1E6B3A]"
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                    {link.submenu && (
                      <div className="ml-4 space-y-1 border-l-2 border-[#1E6B3A]/20 pl-4">
                        {link.submenu.map((sub) => (
                          <a
                            key={sub.id}
                            href={`#${sub.id}`}
                            className="block rounded-xl px-3 py-2 text-sm text-[#1F2933]/70 transition hover:bg-[#1E6B3A]/5 hover:text-[#1E6B3A]"
                            onClick={() => setMenuOpen(false)}
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <ArrowButton
                  label="Falar com Especialista"
                  href={whatsappUrl}
                  tone="gold"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section - Fundo com vídeo e overlay verde escuro */}
        <section ref={heroRef} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
          <motion.div className="absolute inset-0" style={{ y: videoY, scale: videoScale }}>
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.pexels.com/videos/34940811/pexels-photo-34940811.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600"
            >
              <source src="https://videos.pexels.com/video-files/34940811/14800574_3840_2160_30fps.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,53,32,0.92)_0%,rgba(15,53,32,0.7)_40%,rgba(15,53,32,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,53,32,0.24)_0%,rgba(15,53,32,0.45)_100%)]" />

          {floatingParticles.map((particle, index) => (
            <motion.span
              key={index}
              className="absolute rounded-full bg-[#C9A227] shadow-[0_0_24px_rgba(201,162,39,0.65)]"
              style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size }}
              animate={prefersReducedMotion ? undefined : { y: [0, -18, 0], opacity: [0.35, 1, 0.35] }}
              transition={prefersReducedMotion ? undefined : { duration: 4 + index, repeat: Infinity, delay: particle.delay }}
            />
          ))}

          <motion.div className="relative z-10 mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ y: overlayY }}>
            <div className="max-w-4xl space-y-8 py-12 lg:py-20">
              <motion.div
                className="inline-flex items-center gap-3 rounded-full border border-[#C9A227]/20 bg-white/8 px-4 py-2 text-[11px] tracking-[0.34em] text-white/75 backdrop-blur-md uppercase"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="h-2 w-2 rounded-full bg-[#C9A227] shadow-[0_0_18px_rgba(201,162,39,0.75)]" />
                A vanguarda em agro inteligência
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <p className="font-display text-5xl tracking-[0.22em] text-white/96 sm:text-6xl lg:text-7xl xl:text-8xl">
                  TECNOAGRO
                </p>
                <p className="text-sm tracking-[0.32em] text-[#C9A227] uppercase sm:text-base">A Inteligência que Cultiva Legados de Ouro</p>
              </motion.div>

              <motion.h1
                className="max-w-4xl font-display text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.85 }}
              >
                O futuro da sua fazenda começa com decisões inteligentes.
              </motion.h1>

              <motion.p
                className="max-w-2xl text-lg leading-8 text-white/78 md:text-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.85 }}
              >
                Na TECNOAGRO, cada hectare recebe uma estratégia personalizada para produzir mais, gastar menos e valorizar o patrimônio da sua propriedade.
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.85 }}
              >
                <ArrowButton label="Solicitar Diagnóstico" href="#contato" tone="gold" />
                <ArrowButton label="WhatsApp" href={whatsappUrl} tone="green" />
              </motion.div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f3520] to-transparent" />
        </section>

        {/* Seção de Contadores */}
        <section className="border-y border-white/8 bg-white/[0.03] py-10">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
            {counters.map((item) => (
              <CountItem key={item.label} item={item} />
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm tracking-[0.22em] text-white/50 uppercase">
              Monitoramento, previsibilidade e eficiência para gerar resultados consistentes ano após ano.
            </p>
          </div>
        </section>

        {/* Quem Somos */}
        <section id="quem-somos" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
            <motion.div
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,162,39,0.16),transparent_40%,rgba(255,255,255,0.08)_100%)]" />
              <img
                className="relative h-[34rem] w-full rounded-[28px] object-cover object-center"
                src="https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=1200"
                alt="Consultor do agronegócio em ambiente rural"
              />
            </motion.div>

            <div className="space-y-10">
              <SectionHeading
                eyebrow="Quem Somos"
                title="Não somos apenas consultores. Somos parceiros estratégicos na evolução do seu agronegócio."
                description="Cada propriedade possui uma história. Nosso papel é transformar essa história em produtividade, rentabilidade e legado com rigor técnico, visão de futuro e presença constante ao lado do produtor."
              />

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Missão",
                    icon: "leaf",
                    text: "Ativar o máximo potencial da terra por meio de precisão, gestão baseada em dados e manejo integrado.",
                  },
                  {
                    title: "Visão",
                    icon: "chart",
                    text: "Ser a consultoria mais eficiente e inspiradora do agro nacional, referência em produtividade e valor patrimonial.",
                  },
                  {
                    title: "Valores",
                    icon: "science",
                    text: "Rigor técnico, transparência, inovação, sustentabilidade, parceria genuína e resultados tangíveis.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    className="glass-panel p-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C9A227]/25 bg-[#C9A227]/12 text-[#C9A227]">
                      <Icon name={item.icon} />
                    </div>
                    <h3 className="mt-6 font-display text-2xl text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Estratégias */}
        <section id="estrategias" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Estratégias"
              title="O selo de excelência que consolida propriedades mais prósperas e eficientes."
              description="Nosso método combina ciência aplicada, inteligência agronômica e visão empresarial para organizar a operação, fortalecer a tomada de decisão e valorizar o patrimônio do produtor."
              center
            />

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {strategicPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="glass-panel relative overflow-hidden p-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#C9A227]/10 blur-2xl" />
                  <div className="flex items-center justify-between text-[#C9A227]">
                    <span className="text-xs tracking-[0.32em] uppercase">0{index + 1}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#C9A227]/60 to-transparent" />
                  </div>
                  <h3 className="mt-8 font-display text-3xl text-white">{pillar.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/72">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section id="diferenciais" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Diferenciais"
              title="Porque escolher a TECNOAGRO?"
              description="Uma experiência premium de consultoria que une presença no campo, inteligência de gestão e tecnologia para elevar a tomada de decisão."
              center
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group glass-panel p-6 transition duration-300 hover:border-[#C9A227]/35 hover:bg-white/8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[22px] border border-white/10 bg-white/6 text-[#C9A227] transition group-hover:border-[#C9A227]/40 group-hover:bg-[#C9A227]/10">
                      <Icon name={index % 2 === 0 ? "precision" : index % 3 === 0 ? "tractor" : "leaf"} />
                    </div>
                    <h3 className="font-display text-2xl text-white">{item.title}</h3>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/72">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Serviços"
              title="Soluções completas para o agro de alta performance."
              description="Cada serviço foi organizado para transmitir clareza, escala e amplitude técnica, com a elegância de uma consultoria global e a identidade do campo brasileiro."
              center
            />

            <div className="mt-16 grid gap-4 lg:grid-cols-3">
              {serviceGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.title}
                  className="group glass-panel p-7"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C9A227]/12 text-[#C9A227]">
                      <Icon name={groupIndex === 0 ? "chart" : groupIndex === 1 ? "leaf" : "precision"} />
                    </div>
                    <h3 className="font-display text-2xl text-white">{group.title}</h3>
                  </div>

                  <div className="mt-7 grid gap-3">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-[22px] border border-white/8 bg-white/4 px-4 py-4 text-sm tracking-[0.06em] text-white/82 transition group-hover:border-[#C9A227]/30 group-hover:bg-white/8"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section id="processo" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Processo"
              title="Como trabalhamos"
              description="Uma jornada clara e acompanhada de perto, da leitura da propriedade à geração de resultados mensuráveis."
              center
            />

            <div className="relative mt-16">
              <motion.div
                className="absolute left-6 right-6 top-7 hidden h-px origin-left bg-gradient-to-r from-transparent via-[#C9A227]/80 to-transparent md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              <div className="grid gap-4 md:grid-cols-5">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    className="relative glass-panel p-6 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/12 font-display text-2xl text-[#C9A227]">
                      0{index + 1}
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-white">{step}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Galeria */}
        <section id="galeria" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Galeria Premium"
              title="O campo em escala cinematográfica."
              description="Uma curadoria visual com drone, colheita, pulverização, plantio, máquinas e consultoria em movimento. Clique para ampliar."
              center
            />

            <div className="mt-16 columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3">
              {galleryItems.map((item, index) => (
                <motion.button
                  key={item.title}
                  type="button"
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 text-left backdrop-blur-xl",
                    item.size === "tall" ? "aspect-[4/5]" : "aspect-[16/11]",
                  )}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedGallery(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(15,53,32,0.08)_48%,rgba(15,53,32,0.72)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[11px] tracking-[0.32em] text-[#C9A227] uppercase">Galeria</p>
                    <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Visão de Futuro */}
        <section id="visao" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative overflow-hidden rounded-[40px] border border-white/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
            >
              <img
                src="https://images.pexels.com/photos/26256452/pexels-photo-26256452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=2400"
                alt="Colheitadeira em grande área agrícola vista de cima"
                className="h-[34rem] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,53,32,0.9)_0%,rgba(15,53,32,0.58)_45%,rgba(15,53,32,0.1)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(15,53,32,0.4)_100%)]" />
              <motion.div
                className="absolute left-0 top-0 h-full w-full px-6 py-10 sm:px-10 lg:px-16 lg:py-16"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="flex h-full max-w-2xl flex-col justify-end">
                  <p className="section-kicker">Visão de Futuro</p>
                  <h2 className="mt-4 font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                    O agro do amanhã começa hoje.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-white/78 md:text-lg">
                    Enquanto muitos enxergam apenas uma safra, nós enxergamos gerações. Nossa missão é construir propriedades mais produtivas, sustentáveis e valorizadas.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Resultados */}
        <section id="resultados" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Resultados"
              title="Números que mostram o impacto da consultoria."
              description="Performance, eficiência e ganho patrimonial caminhando juntos em uma operação mais previsível e resiliente."
              center
            />

            <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <GlassPanel className="p-8 lg:p-10">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { value: "+500", label: "Propriedades atendidas" },
                    { value: "+100 mil", label: "hectares monitorados" },
                    { value: "+20", label: "anos de experiência" },
                    { value: "Milhões", label: "economizados em insumos" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[28px] border border-white/8 bg-white/4 p-6">
                      <div className="font-display text-4xl text-white md:text-5xl">{item.value}</div>
                      <p className="mt-2 text-sm tracking-[0.18em] text-white/60 uppercase">{item.label}</p>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel className="flex flex-col justify-between p-8 lg:p-10">
                <p className="text-sm tracking-[0.32em] text-[#C9A227] uppercase">Destaque de campo</p>
                <div className="mt-8 space-y-6">
                  <p className="font-display text-3xl leading-tight text-white md:text-4xl">
                    "Fechamos parceria em 2025 e já ganhamos na entre safra irrigada média de 6 sacas a mais do que o ano anterior."
                  </p>
                  <p className="text-sm leading-7 text-white/72">
                    Rafael Shimitashu, produtor rural de Cristalina, GO, sobre o atendimento exclusivo da TECNOAGRO.
                  </p>
                </div>
                <div className="mt-10 rounded-[28px] border border-[#C9A227]/20 bg-[#C9A227]/10 p-5 text-sm leading-7 text-white/78">
                  Mais eficiência no plantio, menos custo e acompanhamento lado a lado desde a regulagem até a colheita.
                </div>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Depoimentos"
              title="A confiança de quem produz em escala."
              description="A percepção do produtor confirma a qualidade da consultoria e o impacto da parceria no dia a dia da fazenda."
              center
            />

            <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.18fr]">
              <GlassPanel className="p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm tracking-[0.28em] text-[#C9A227] uppercase">Slider</p>
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={cn(
                          "h-2.5 rounded-full transition-all",
                          index === activeTestimonial ? "w-8 bg-[#C9A227]" : "w-2.5 bg-white/30",
                        )}
                        onClick={() => setActiveTestimonial(index)}
                        aria-label={`Ver depoimento ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      className="space-y-6"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45 }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonials[activeTestimonial].photo}
                          alt={testimonials[activeTestimonial].author}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />
                        <div>
                          <p className="font-display text-2xl text-white">{testimonials[activeTestimonial].author}</p>
                          <p className="text-sm text-white/65">{testimonials[activeTestimonial].role}</p>
                        </div>
                      </div>
                      <p className="text-xl leading-9 text-white/86 md:text-2xl">
                        {testimonials[activeTestimonial].quote}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </GlassPanel>

              <GlassPanel className="relative overflow-hidden p-8 lg:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(92,166,107,0.18),transparent_32%)]" />
                <div className="relative">
                  <p className="section-kicker">Performance observada</p>
                  <h3 className="mt-4 font-display text-4xl text-white">Eficiência que aparece no caixa e no campo.</h3>
                  <ul className="mt-8 space-y-5 text-white/76">
                    <li>Menos desperdício em insumos e melhor uso do potencial de cada talhão.</li>
                    <li>Plantio acompanhado de perto para reduzir falhas e elevar uniformidade.</li>
                    <li>Consultoria presente desde o planejamento até a colheita e o pós-colheita.</li>
                  </ul>
                  <div className="mt-10 rounded-[28px] border border-white/10 bg-white/4 p-6 text-sm leading-7 text-white/72">
                    Nosso foco é ampliar produtividade com segurança técnica e uma gestão capaz de proteger o patrimônio do produtor.
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* CTA Gigante */}
        <section className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[40px] border border-white/10 bg-[#1E6B3A] px-6 py-16 text-center shadow-[0_28px_100px_rgba(0,0,0,0.32)] sm:px-10 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-4xl"
              >
                <p className="text-xs tracking-[0.38em] text-[#C9A227] uppercase">CTA Gigante</p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-6xl">Sua fazenda pode produzir muito mais.</h2>
                <p className="mt-5 text-lg leading-8 text-white/80">Vamos conversar e transformar inteligência em produtividade, rentabilidade e legado.</p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <ArrowButton label="Quero um Diagnóstico" href="#contato" tone="gold" />
                  <ArrowButton label="Falar com Especialista" href={whatsappUrl} tone="green" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Contato"
              title="Converse com a TECNOAGRO."
              description="Envie seus dados e descreva a área cultivada. O formulário está preparado para integração com PHP e PHPMailer via SMTP, com fallback para WhatsApp quando o endpoint não estiver disponível."
              center
            />

            <div className="mt-14 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <GlassPanel className="overflow-hidden p-0">
                <iframe
                  title="Mapa TECNOAGRO"
                  className="h-[28rem] w-full border-0 grayscale-[0.15]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-48.75%2C-15.95%2C-47.85%2C-15.1&layer=mapnik"
                />
              </GlassPanel>

              <GlassPanel className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm tracking-[0.28em] text-[#C9A227] uppercase">Formulário Premium</p>
                    <h3 className="mt-3 font-display text-3xl text-white">Solicitar Diagnóstico</h3>
                  </div>
                  <div className="hidden rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-4 py-2 text-xs tracking-[0.26em] text-[#C9A227] uppercase sm:block">
                    SMTP Ready
                  </div>
                </div>

                <form className="mt-8 grid gap-4" onSubmit={submitContact}>
                  {[
                    { name: "nome", label: "Nome", type: "text", placeholder: "Seu nome" },
                    { name: "telefone", label: "Telefone", type: "tel", placeholder: "(00) 00000-0000" },
                    { name: "cidade", label: "Cidade", type: "text", placeholder: "Cidade / Estado" },
                    { name: "email", label: "Email", type: "email", placeholder: "voce@empresa.com.br" },
                    { name: "area", label: "Área cultivada", type: "text", placeholder: "Ex.: 1.250 ha" },
                  ].map((field) => (
                    <label key={field.name} className="grid gap-2 text-sm text-white/74">
                      <span>{field.label}</span>
                      <input
                        className="premium-input"
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formState[field.name as keyof typeof formState]}
                        onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))}
                        required={field.name !== "area"}
                      />
                    </label>
                  ))}
                  <label className="grid gap-2 text-sm text-white/74">
                    <span>Mensagem</span>
                    <textarea
                      className="premium-input min-h-36 resize-none"
                      name="mensagem"
                      placeholder="Conte um pouco sobre sua propriedade e o principal objetivo da consultoria."
                      value={formState.mensagem}
                      onChange={(event) => setFormState((current) => ({ ...current, mensagem: event.target.value }))}
                      required
                    />
                  </label>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <ArrowButton
                      label={formStatus === "sending" ? "Enviando" : "Solicitar Diagnóstico"}
                      tone="gold"
                      type="submit"
                    />
                    <p className={cn("text-sm", formStatus === "success" ? "text-[#5CA66B]" : formStatus === "error" ? "text-[#C9A227]" : "text-white/55")}>
                      {formStatus === "success"
                        ? "Mensagem enviada com sucesso."
                        : formStatus === "error"
                          ? "O envio foi redirecionado para o WhatsApp."
                          : "Respostas rápidas por WhatsApp ou SMTP com PHPMailer."}
                    </p>
                  </div>
                </form>
              </GlassPanel>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé Premium */}
      <footer className="border-t border-white/10 bg-[#0f3520] py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="TECNOAGRO" 
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/68">
              Uma consultoria premium em inteligência agronômica para propriedades que buscam produtividade, rentabilidade e legado.
            </p>
            <p className="text-xs tracking-[0.3em] text-[#C9A227] uppercase">
              Cultivando inteligência. Colhendo resultados.
            </p>
          </div>

          <div>
            <p className="text-sm tracking-[0.28em] text-[#C9A227] uppercase">Menu</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="text-sm text-white/68 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm tracking-[0.28em] text-[#C9A227] uppercase">Contato</p>
            <div className="mt-4 space-y-3 text-sm text-white/68">
              <p>Telefone: +55 (11) 99999-9999</p>
              <p>WhatsApp: +55 (11) 99999-9999</p>
              <p>Email: contato@tecnoagro.com.br</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/65">
              <a className="transition hover:text-white" href="https://instagram.com/tecnoagro" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="transition hover:text-white" href="https://facebook.com/tecnoagro" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a className="transition hover:text-white" href="https://linkedin.com/company/tecnoagro" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/8 px-4 pt-6 text-sm text-white/52 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>TECNOAGRO © 2026</p>
          <p>Estrutura preparada para Google Analytics, Meta Pixel e Google Ads.</p>
        </div>
      </footer>

      {/* WhatsApp Flutuante */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E6B3A] text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] ring-1 ring-[#C9A227]/30 transition hover:-translate-y-1 hover:bg-[#13482A]"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#C9A227]/30 animate-ping opacity-40" />
        <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12c0 4.4-3.6 8-8 8a7.8 7.8 0 0 1-3.8-.95L4 20l1.08-4.05A7.9 7.9 0 0 1 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8Z" />
          <path d="M9.5 8.75c.25-.55.54-.6.92-.6h.72c.2 0 .46.08.6.36l.8 1.72c.13.28.11.5-.04.69l-.52.64c-.15.18-.2.42-.08.68.18.39.7 1.24 1.48 2.01.78.78 1.63 1.3 2.02 1.48.26.12.5.07.68-.08l.64-.52c.18-.15.41-.17.69-.04l1.72.8c.27.13.36.39.36.6v.72c0 .38-.05.67-.6.92-.42.19-.9.29-1.56.29-1.84 0-4.3-1.32-6.19-3.22-1.9-1.9-3.22-4.36-3.22-6.2 0-.65.1-1.14.29-1.56Z" />
        </svg>
      </a>

      {/* Lightbox da Galeria */}
      <AnimatePresence>
        {selectedGallery !== null ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGallery(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0f3520] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 18 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition hover:text-white"
                onClick={() => setSelectedGallery(null)}
              >
                Fechar
              </button>
              <img
                src={galleryItems[selectedGallery].src}
                alt={galleryItems[selectedGallery].alt}
                className="max-h-[80vh] w-full object-cover"
              />
              <div className="border-t border-white/10 px-6 py-5">
                <p className="text-xs tracking-[0.3em] text-[#C9A227] uppercase">Lightbox</p>
                <h3 className="mt-2 font-display text-2xl text-white">{galleryItems[selectedGallery].title}</h3>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
