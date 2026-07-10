import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "./utils/cn";

type SectionLink = {
  id: string;
  label: string;
  submenu?: { id: string; label: string }[];
};

type ServiceGroup = {
  title: string;
  items: string[];
};

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  photo: string;
};

// WhatsApp correto
const whatsappNumber = "5561996481878";
const whatsappMessage = "Olá, gostaria de agendar um diagnóstico da minha propriedade.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

// Redes sociais
const instagramUrl = "https://instagram.com/tecnoagro8";
const emailContato = "contato@tecnoagro.com.br";

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
  { id: "resultados", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
];

// Mensagens de valor com neuro-linguística
const valueMessages = [
  { 
    icon: "🎯", 
    title: "Decisões que criam vantagem competitiva",
    description: "Enquanto outros reagem ao mercado, você antecipa. Cada hectare se torna uma fonte de vantagem que seus concorrentes não terão."
  },
  { 
    icon: "⚡", 
    title: "Resultados que falam por si mesmos",
    description: "A excelência não precisa de apresentação. Ela se revela na colheita, nos números e na valorização do seu patrimônio."
  },
  { 
    icon: "🌱", 
    title: "Legado que transcende gerações",
    description: "O que você constrói hoje é a base para as próximas safras. E para os próximos 30 anos da sua família no campo."
  },
  { 
    icon: "🔮", 
    title: "Visão que enxerga além da safra atual",
    description: "O produtor que enxerga o futuro não espera. Ele constrói. E nós estamos aqui para transformar essa visão em realidade."
  },
];

// Depoimentos
const testimonials: Testimonial[] = [
  {
    quote: "Fechamos parceria em 2025 e já ganhamos na entre safra irrigada média de 6 sacas a mais do que o ano anterior. A TECNOAGRO transformou nossa forma de enxergar a produção.",
    author: "Rafael Shimitashu",
    role: "Produtor rural, Cristalina/GO",
    photo: "https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
  },
  {
    quote: "Abrimos a mente para novas tecnologias e ganhamos mais eficiência no plantio, menos custo e uma parceria que segue para os próximos anos.",
    author: "Rafael Shimitashu",
    role: "Produtor rural, Cristalina/GO",
    photo: "https://images.pexels.com/photos/5484072/pexels-photo-5484072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
  },
];

// Fotos para o carrossel da galeria
const galleryItems: GalleryItem[] = [
  {
    src: "/images/galeria/foto1.jpg",
    alt: "Vista aérea de lavouras",
    title: "Monitoramento com Drone",
  },
  {
    src: "/images/galeria/foto2.jpg",
    alt: "Colheitadeira em campo",
    title: "Colheita de Alta Performance",
  },
  {
    src: "/images/galeria/foto3.jpg",
    alt: "Máquinas modernas",
    title: "Tecnologia no Campo",
  },
  {
    src: "/images/galeria/foto4.jpg",
    alt: "Drones agrícolas",
    title: "Agricultura de Precisão",
  },
  {
    src: "/images/galeria/foto5.jpg",
    alt: "Tratores operando",
    title: "Plantio Estratégico",
  },
  {
    src: "/images/galeria/foto6.jpg",
    alt: "Gestão de talhões",
    title: "Gestão Patrimonial",
  },
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

function ArrowButton({
  label,
  href,
  tone = "gold",
  onClick,
  type = "button",
  target = "_self",
}: {
  label: string;
  href?: string;
  tone?: "gold" | "dark";
  onClick?: () => void;
  type?: "button" | "submit";
  target?: "_self" | "_blank";
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[0.22em] transition duration-300 font-button",
    tone === "gold"
      ? "bg-[#C9A227] text-[#13482A] shadow-[0_18px_40px_rgba(201,162,39,0.28)] hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(201,162,39,0.36)]"
      : "bg-[#13482A] text-white border border-white/25 hover:bg-[#1E6B3A] hover:border-[#C9A227]/40",
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
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
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
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
  const galleryIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-play do carrossel da galeria
  useEffect(() => {
    if (prefersReducedMotion) return;

    galleryIntervalRef.current = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryItems.length);
    }, 4000);

    return () => {
      if (galleryIntervalRef.current) {
        clearInterval(galleryIntervalRef.current);
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
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

    const payload = new FormData();
    Object.entries(formState).forEach(([key, value]) => payload.append(key, value));

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("request-failed");

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
      {/* Header com fundo branco e logo maior */}
      <header className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled 
          ? "border-[#1E6B3A]/10 bg-white/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.08)]" 
          : "border-transparent bg-white"
      )}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="TECNOAGRO" 
              className="h-20 w-auto object-contain"
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
            <div className="flex items-center gap-3">
              <ArrowButton label="Diagnóstico" href="#contato" tone="gold" />
              <ArrowButton label="Especialista" href={whatsappUrl} tone="dark" target="_blank" />
            </div>
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
                <div className="flex flex-col gap-3">
                  <ArrowButton
                    label="Diagnóstico"
                    href="#contato"
                    tone="gold"
                    onClick={() => setMenuOpen(false)}
                  />
                  <ArrowButton
                    label="Especialista"
                    href={whatsappUrl}
                    tone="dark"
                    onClick={() => setMenuOpen(false)}
                    target="_blank"
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
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
                <ArrowButton label="Fale com Especialista" href={whatsappUrl} tone="dark" target="_blank" />
              </motion.div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f3520] to-transparent" />
        </section>

        {/* Seção de Mensagens de Valor */}
        <section className="border-y border-white/8 bg-[#0f3520] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.36em] text-[#C9A227] uppercase">O que você conquista ao escolher a excelência</p>
              <h2 className="mt-4 font-display text-3xl text-white md:text-4xl">
                A diferença entre <span className="text-[#C9A227]">produzir</span> e <span className="text-[#C9A227]">protagonizar</span>
              </h2>
              <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                Enquanto outros apenas colhem, você constrói um legado. Cada decisão se torna um ativo.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {valueMessages.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-panel p-6 text-center transition hover:-translate-y-2 hover:border-[#C9A227]/30"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Mensagem com neuro-linguística - MAIS VISÍVEL */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-block px-6 py-3 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10">
                <p className="text-sm tracking-[0.15em] text-[#C9A227] font-medium">
                  ⚡ O que você faria se soubesse que pode transformar sua propriedade em um patrimônio 3x mais valioso?
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quem Somos - Layout Ultra Premium */}
        <section id="quem-somos" className="py-28 md:py-36 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.36em] text-[#C9A227] uppercase">Quem Somos</p>
              <h2 className="mt-4 font-display text-4xl text-white md:text-5xl lg:text-6xl">
                Parceiros estratégicos na <br />
                <span className="text-[#C9A227]">evolução do seu agronegócio</span>
              </h2>
              <p className="mt-6 max-w-3xl mx-auto text-white/70 text-lg leading-8">
                Cada propriedade possui uma história. Nosso papel é transformar essa história em produtividade, 
                rentabilidade e legado com rigor técnico, visão de futuro e presença constante ao lado do produtor.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
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
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#1E6B3A]/20 to-[#C9A227]/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/30"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                >
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C9A227]/5 blur-3xl transition duration-700 group-hover:bg-[#C9A227]/15" />
                  
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A227]/25 bg-[#C9A227]/10 text-[#C9A227] transition group-hover:scale-110 group-hover:bg-[#C9A227]/20">
                      <Icon name={item.icon} />
                    </div>
                    <h3 className="mt-6 font-display text-3xl text-white">{item.title}</h3>
                    <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#C9A227] to-transparent" />
                    <p className="mt-5 text-base leading-7 text-white/75">{item.text}</p>
                  </div>
                </motion.div>
              ))}
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

        {/* Galeria Premium com Carrossel */}
        <section id="galeria" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Galeria Premium"
              title="O campo em escala cinematográfica."
              description="Uma curadoria visual com drone, colheita, pulverização, plantio, máquinas e consultoria em movimento."
              center
            />

            <div className="mt-12 relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              <div className="relative aspect-[16/9] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentGalleryIndex}
                    src={galleryItems[currentGalleryIndex].src}
                    alt={galleryItems[currentGalleryIndex].alt}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/34940811/pexels-photo-34940811.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200";
                    }}
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3520]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-xs tracking-[0.3em] text-[#C9A227] uppercase">Galeria</p>
                  <h3 className="mt-2 font-display text-3xl text-white">{galleryItems[currentGalleryIndex].title}</h3>
                </div>

                <button
                  onClick={() => setCurrentGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/60"
                  aria-label="Anterior"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentGalleryIndex((prev) => (prev + 1) % galleryItems.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/60"
                  aria-label="Próximo"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-center gap-2 p-4 bg-black/20">
                {galleryItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGalleryIndex(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === currentGalleryIndex ? "w-8 bg-[#C9A227]" : "w-2 bg-white/30"
                    )}
                    aria-label={`Ver imagem ${index + 1}`}
                  />
                ))}
              </div>
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

        {/* Depoimentos */}
        <section id="resultados" className="py-28 md:py-36 bg-[#13482A]">
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
                  <p className="text-sm tracking-[0.28em] text-[#C9A227] uppercase">Depoimento</p>
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
                        "{testimonials[activeTestimonial].quote}"
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
                <p className="text-xs tracking-[0.38em] text-[#C9A227] uppercase">Sua próxima safra começa aqui</p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-6xl">Sua fazenda pode produzir muito mais.</h2>
                <p className="mt-5 text-lg leading-8 text-white/80">Vamos conversar e transformar inteligência em produtividade, rentabilidade e legado.</p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <ArrowButton label="Quero um Diagnóstico" href="#contato" tone="gold" />
                  <ArrowButton label="Fale com Especialista" href={whatsappUrl} tone="dark" target="_blank" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contato com Neuro-linguística */}
        <section id="contato" className="py-24 md:py-32 bg-[#13482A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Contato"
              title="O primeiro passo para transformar sua propriedade"
              description="Preencha o formulário ou fale diretamente conosco. Cada minuto sem ação é uma oportunidade perdida de valorização."
              center
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr]">
              {/* Lado esquerdo - Neuro-linguística */}
              <GlassPanel className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs tracking-[0.36em] text-[#C9A227] uppercase">Por que esperar?</p>
                  <h3 className="mt-4 font-display text-3xl text-white">O produtor que vence não espera o momento certo. Ele cria.</h3>
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-2xl">⏳</div>
                      <div>
                        <p className="font-semibold text-white">Enquanto você decide, outros avançam</p>
                        <p className="text-sm text-white/65">A diferença entre o produtor que prospera e o que apenas sobrevive está na velocidade da decisão.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-2xl">💰</div>
                      <div>
                        <p className="font-semibold text-white">Cada hectare pode render 30% mais</p>
                        <p className="text-sm text-white/65">O que você faria se soubesse que pode transformar sua propriedade em um patrimônio 3x mais valioso?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-2xl">🤝</div>
                      <div>
                        <p className="font-semibold text-white">Você não precisa fazer isso sozinho</p>
                        <p className="text-sm text-white/65">Nossos especialistas estão prontos para construir junto com você o futuro da sua fazenda.</p>
                      </div>
                    </div>
                  </div>

                  {/* Mensagem com neuro-linguística - MAIS VISÍVEL */}
                  <div className="mt-8 p-5 rounded-2xl border border-[#C9A227]/30 bg-[#C9A227]/10">
                    <p className="text-sm tracking-[0.15em] text-[#C9A227] text-center font-medium">
                      ⚡ O que você faria se pudesse multiplicar o valor da sua terra em 5 anos?
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/70 mb-4">Fale diretamente com um especialista:</p>
                  <div className="flex flex-col gap-3">
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-white font-semibold transition hover:bg-[#1da851]"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp - Falar com Especialista
                    </a>
                    <a 
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 rounded-full bg-[#E4405F] px-6 py-4 text-white font-semibold transition hover:bg-[#d13a54]"
                    >
                      <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                      Instagram @tecnoagro8
                    </a>
                    <a 
                      href={`mailto:${emailContato}`}
                      className="flex items-center justify-center gap-3 rounded-full bg-[#13482A] border border-white/20 px-6 py-4 text-white font-semibold transition hover:bg-[#1E6B3A]"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email: {emailContato}
                    </a>
                  </div>
                </div>
              </GlassPanel>

              {/* Lado direito - Formulário */}
              <GlassPanel className="p-6 sm:p-8 lg:p-10">
                <div>
                  <p className="text-sm tracking-[0.28em] text-[#C9A227] uppercase">Formulário</p>
                  <h3 className="mt-3 font-display text-3xl text-white">Solicitar Diagnóstico</h3>
                </div>

                <form className="mt-8 grid gap-4" onSubmit={submitContact}>
                  {[
                    { name: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome" },
                    { name: "telefone", label: "Telefone com WhatsApp", type: "tel", placeholder: "(00) 00000-0000" },
                    { name: "cidade", label: "Cidade / Estado", type: "text", placeholder: "Cidade / Estado" },
                    { name: "email", label: "Email", type: "email", placeholder: "voce@empresa.com.br" },
                    { name: "area", label: "Área cultivada (ha)", type: "text", placeholder: "Ex.: 1.250" },
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
                      label={formStatus === "sending" ? "Enviando..." : "Solicitar Diagnóstico"}
                      tone="gold"
                      type="submit"
                    />
                    {formStatus === "success" && (
                      <p className="text-sm text-[#5CA66B]">✓ Mensagem enviada com sucesso!</p>
                    )}
                    {formStatus === "error" && (
                      <p className="text-sm text-[#C9A227]">Redirecionando para WhatsApp...</p>
                    )}
                  </div>
                </form>

                <div className="mt-6 p-4 rounded-xl border border-[#C9A227]/10 bg-[#C9A227]/5">
                  <p className="text-xs text-center text-white/60">
                    ⚡ <span className="text-[#C9A227] font-medium">Primeiro diagnóstico gratuito</span> para as primeiras 10 propriedades
                  </p>
                </div>
              </GlassPanel>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé com logo verde - CORRIGIDO */}
      <footer className="border-t border-white/10 py-14" style={{ background: '#0f3520' }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/logo-verde.png" 
                alt="TECNOAGRO" 
                className="h-20 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                }}
              />
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/80">
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
                <a key={link.id} href={`#${link.id}`} className="text-sm text-white/80 transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm tracking-[0.28em] text-[#C9A227] uppercase">Contato</p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block transition hover:text-[#25D366]">
                WhatsApp: +55 61 99648-1878
              </a>
              <a href={`mailto:${emailContato}`} className="block transition hover:text-white">
                Email: {emailContato}
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="block transition hover:text-[#E4405F]">
                Instagram: @tecnoagro8
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a className="text-white/60 transition hover:text-[#E4405F]" href={instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="text-white/60 transition hover:text-[#1877F2]" href="https://facebook.com/tecnoagro" target="_blank" rel="noreferrer">
                Facebook
              </a>
              <a className="text-white/60 transition hover:text-[#0A66C2]" href="https://linkedin.com/company/tecnoagro" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/8 px-4 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>TECNOAGRO © 2026</p>
          <p>Estrutura preparada para Google Analytics, Meta Pixel e Google Ads.</p>
        </div>
      </footer>

      {/* WhatsApp Flutuante */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition hover:scale-110 hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)]"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-40" />
        <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
