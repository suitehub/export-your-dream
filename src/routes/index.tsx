import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  SlidersHorizontal,

  ChevronDown,
  CircleUserRound,
  CreditCard,
  Flower2,
  Heart,
  HeartPulse,
  Leaf,
  Mail,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Truck,
  X,
} from "lucide-react";

import heroImage from "@/assets/viva-hero.jpg";
import benefitsImage from "@/assets/viva-benefits.jpg";
import productsImage from "@/assets/viva-products.jpg";
import { Button } from "@/components/ui/button";
import { formatPrice, products } from "@/data/products";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Projeto Viva com Saúde | Produtos Naturais" },
      {
        name: "description",
        content:
          "Suplementos, fitoterápicos e produtos naturais para sua saúde, equilíbrio e bem-estar.",
      },
      { property: "og:title", content: "Projeto Viva com Saúde | Produtos Naturais" },
      {
        property: "og:description",
        content: "Mais saúde para o seu dia a dia com produtos naturais selecionados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  { label: "Todas", icon: Plus },
  { label: "Emagrecedores", icon: Leaf },
  { label: "Coluna", icon: Sparkles },
  { label: "Beleza e Bem Estar", icon: Flower2 },
  { label: "Vitaminas", icon: BadgeCheck },
  { label: "Detox", icon: Sprout },
  { label: "Digestivo", icon: Leaf },
  { label: "Sistema Circulatório", icon: HeartPulse },
  { label: "Imunidade", icon: ShieldCheck },
  { label: "Cabelos", icon: Sparkles },
  { label: "Saúde da Mulher", icon: Flower2 },
];

const allCategories = categories.filter((item) => item.label !== "Todas").map((item) => item.label);

const COLLAPSED_CATEGORIES = 6;
const COLLAPSED_PRODUCTS = 4;


const benefits = [
  { icon: Truck, title: "Entrega para todo o Brasil", copy: "com segurança e agilidade" },
  { icon: CreditCard, title: "Parcele em até 6x", copy: "nos principais cartões" },
  { icon: ShieldCheck, title: "Compra 100% segura", copy: "seus dados protegidos" },
  { icon: Leaf, title: "Produtos originais", copy: "e de alta qualidade" },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="group flex shrink-0 items-center gap-2" aria-label="Projeto Viva com Saúde — início">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-primary transition-transform group-hover:-rotate-6">
        <Sprout className="h-7 w-7" strokeWidth={1.7} />
      </span>
      <span className={compact ? "hidden sm:block" : "block"}>
        <span className="block text-[0.58rem] font-semibold uppercase leading-none text-muted-foreground">Projeto</span>
        <span className="font-display block text-xl leading-[0.86] text-foreground">Viva com<br />Saúde</span>
        <span className="mt-1 block text-[0.42rem] font-bold uppercase text-muted-foreground">Produtos fitoterápicos</span>
      </span>
    </a>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [sort, setSort] = useState("relevancia");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categoriesClosing, setCategoriesClosing] = useState(false);

  const toggleCategories = () => {
    if (categoriesOpen) {
      setCategoriesClosing(true);
      window.setTimeout(() => {
        setCategoriesOpen(false);
        setCategoriesClosing(false);
      }, 300);
      return;
    }
    setCategoriesOpen(true);
  };

  const visibleCategories = categoriesOpen ? categories : categories.slice(0, COLLAPSED_CATEGORIES);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    const list = products.filter((product) => {
      const matchesCategory = category === "Todas" || product.category === category;
      const matchesSearch = !normalized || `${product.name} ${product.category}`.toLocaleLowerCase("pt-BR").includes(normalized);
      return matchesCategory && matchesSearch;
    });
    const sorted = [...list];
    if (sort === "menor-preco") sorted.sort((a, b) => a.price - b.price);
    if (sort === "maior-preco") sorted.sort((a, b) => b.price - a.price);
    if (sort === "desconto") sorted.sort((a, b) => b.discount - a.discount);
    if (sort === "nome") sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    return sorted;
  }, [category, query, sort]);

  const visibleProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, COLLAPSED_PRODUCTS);


  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
    setCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((current) => {
      const next = (current[id] ?? 0) + delta;
      if (next <= 0) {
        const copy = { ...current };
        delete copy[id];
        return copy;
      }
      return { ...current, [id]: next };
    });
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterSent(true);
  };

  return (
    <main id="inicio" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-primary-foreground/15 px-4 sm:grid-cols-4 lg:px-8">
          {[benefits[0], benefits[2], benefits[1], benefits[3]].map((benefit) => {
            if (!benefit) return null;
            const { icon: Icon, title } = benefit;
            return (
            <div key={title} className="flex h-9 items-center justify-center gap-2 px-2 text-center text-[0.65rem] font-medium sm:text-xs">
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{title}</span>
            </div>
            );
          })}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto grid min-h-20 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 lg:px-8">
          <Brand compact />
          <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#inicio">Início</a>
            <a className="nav-link" href="#produtos">Produtos</a>
            <a className="nav-link inline-flex items-center gap-1" href="#categorias">Categorias <ChevronDown className="h-3 w-3" /></a>
            <a className="nav-link" href="#sobre">Sobre</a>
            <a className="nav-link" href="#contato">Contato</a>
          </nav>
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <label className="relative hidden w-64 xl:block">
              <span className="sr-only">Buscar produtos</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="O que você está procurando?" className="h-10 rounded-full border-0 bg-muted pl-9 pr-8 shadow-none" />
              {query && <Button type="button" variant="ghost" size="icon" className="absolute right-0.5 top-0.5 h-9 w-9 rounded-full" onClick={() => setQuery("")} aria-label="Limpar busca"><X /></Button>}
            </label>
            <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Minha conta"><CircleUserRound /></Button>
            <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Favoritos"><Heart /></Button>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full" aria-label={`Carrinho com ${cartCount} itens`}>
                  <ShoppingCart />
                  {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">{cartCount}</span>}
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col sm:max-w-md">
                <SheetHeader className="border-b border-border pb-5 text-left">
                  <SheetTitle className="font-display text-3xl">Seu carrinho</SheetTitle>
                  <SheetDescription>{cartCount ? `${cartCount} ${cartCount === 1 ? "item selecionado" : "itens selecionados"}` : "Seu carrinho está vazio."}</SheetDescription>
                </SheetHeader>
                <div className="flex-1 space-y-4 overflow-y-auto py-5">
                  {products.filter((product) => cart[product.id]).map((product) => (
                    <div key={product.id} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 border-b border-border pb-4">
                      <div className="product-crop h-20 rounded-md" style={{ backgroundImage: `url(${productsImage})`, backgroundPosition: product.imagePosition }} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-snug">{product.name}</p>
                        <p className="mt-1 font-bold text-primary">{formatPrice(product.price)}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, -1)} aria-label={`Diminuir ${product.name}`}><Minus /></Button>
                          <span className="w-7 text-center text-sm font-semibold">{cart[product.id]}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(product.id, 1)} aria-label={`Aumentar ${product.name}`}><Plus /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-5">
                  <div className="mb-4 flex items-center justify-between"><span className="text-sm text-muted-foreground">Subtotal</span><strong className="text-xl">{formatPrice(subtotal)}</strong></div>
                  <Button className="h-12 w-full" disabled={!cartCount}>Finalizar compra <ArrowRight /></Button>
                </div>
              </SheetContent>
            </Sheet>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Abrir menu"><Menu /></Button></SheetTrigger>
              <SheetContent side="left" className="w-[86%]">
                <SheetHeader className="text-left"><SheetTitle><Brand /></SheetTitle><SheetDescription>Navegue pela loja.</SheetDescription></SheetHeader>
                <nav className="mt-8 grid gap-1">
                  {[['Início','#inicio'],['Produtos','#produtos'],['Categorias','#categorias'],['Sobre','#sobre'],['Contato','#contato']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-border py-4 text-base font-semibold">{label}</a>)}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="border-t border-border px-4 py-2 xl:hidden">
          <label className="relative mx-auto block max-w-2xl">
            <span className="sr-only">Buscar produtos</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produtos..." className="h-9 rounded-full bg-muted pl-9 shadow-none" />
          </label>
        </div>
      </header>

      <section className="relative min-h-[33rem] overflow-hidden sm:min-h-[36rem]">
        <img src={heroImage} alt="Suplemento natural Viva entre folhas e flores sobre pedestal de pedra" width={1536} height={864} className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex min-h-[33rem] max-w-7xl items-center px-5 py-16 sm:min-h-[36rem] lg:px-8">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase text-primary">Saúde natural para uma vida melhor</p>
            <h1 className="font-display text-5xl leading-[0.95] text-primary sm:text-6xl lg:text-7xl">Mais saúde<br />para o seu dia a dia.</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/80">Produtos naturais, fitoterápicos e suplementos para o seu bem-estar físico e mental.</p>
            <Button asChild size="lg" className="mt-7 h-12 rounded-full px-6"><a href="#produtos">Conheça nossos produtos <ArrowRight /></a></Button>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-primary/15 pt-5 text-xs font-semibold text-primary">
              <span className="flex items-center gap-2"><Leaf className="h-5 w-5" /> 100% naturais</span>
              <span className="flex items-center gap-2"><BadgeCheck className="h-5 w-5" /> Qualidade comprovada</span>
              <span className="flex items-center gap-2"><Truck className="h-5 w-5" /> Entrega nacional</span>
            </div>
          </div>
        </div>
      </section>

      <section id="categorias" className="relative z-10 mx-auto -mt-5 max-w-7xl px-4 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-5 shadow-soft sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl sm:text-3xl">Navegue por categorias</h2>
            <Button
              variant="ghost"
              className="hidden items-center gap-2 text-xs font-semibold text-primary sm:inline-flex"
              onClick={toggleCategories}
            >
              {categoriesOpen ? (
                <>
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </>
              ) : (
                <>
                  Ver todas as categorias <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <div className="category-scroll flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
            {visibleCategories.map(({ label, icon: Icon }, index) => {
              const active = category === label;
              const extra = index >= COLLAPSED_CATEGORIES;
              return (
                <Button
                  key={label}
                  variant="ghost"
                  style={extra ? { animationDelay: `${(index - COLLAPSED_CATEGORIES) * 45}ms`, animationFillMode: "both" } : undefined}
                  className={`group h-auto min-w-20 flex-col gap-2 px-1 py-1 text-center hover:bg-transparent ${
                    extra ? (categoriesClosing ? "animate-fade-out" : "animate-fade-in") : ""
                  }`}
                  onClick={() => {
                    setCategory(label);
                    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-pressed={active}
                >
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-full transition-colors ${
                      active ? "bg-primary text-primary-foreground" : "bg-brand-soft text-primary group-hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="whitespace-normal text-[0.68rem] leading-tight text-foreground">{label}</span>
                </Button>
              );
            })}
          </div>
          <Button variant="outline" className="mt-4 w-full rounded-full sm:hidden" onClick={toggleCategories}>
            {categoriesOpen ? (
              <>
                <ArrowLeft /> Voltar
              </>
            ) : (
              <>
                Ver todas as categorias <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </section>

      <section id="produtos" className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">
              {showAllProducts ? "Todos os produtos" : "Produtos em destaque"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {showAllProducts
                ? `${filteredProducts.length} ${filteredProducts.length === 1 ? "produto disponível" : "produtos disponíveis"}.`
                : "Os mais vendidos para sua saúde e bem-estar."}
            </p>
          </div>
          {(query || category !== "Todas") && (
            <Button variant="outline" className="rounded-full" onClick={() => { setQuery(""); setCategory("Todas"); }}>
              Limpar filtros <X />
            </Button>
          )}
        </div>

        {showAllProducts && (
          <div className="mb-7 animate-fade-in rounded-lg border border-border bg-card p-4 shadow-soft sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <label className="relative block">
                <span className="sr-only">Buscar produtos</span>
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por nome ou categoria..."
                  className="h-11 rounded-full bg-muted pl-9 shadow-none"
                />
              </label>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
                <select
                  aria-label="Ordenar produtos"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm lg:w-56"
                >
                  <option value="relevancia">Mais relevantes</option>
                  <option value="menor-preco">Menor preço</option>
                  <option value="maior-preco">Maior preço</option>
                  <option value="desconto">Maior desconto</option>
                  <option value="nome">Nome (A-Z)</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Todas", ...allCategories].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setCategory(label)}
                  aria-pressed={category === label}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    category === label
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {visibleProducts.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {visibleProducts.map((product) => (
              <article key={product.id} className="group flex min-w-0 flex-col rounded-md border border-border bg-card p-2.5 shadow-card transition-transform hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-md bg-muted">
                  <span className="absolute right-1.5 top-1.5 z-10 rounded-full bg-sale px-2 py-1 text-[0.62rem] font-bold text-sale-foreground">{product.discount}% OFF</span>
                  <div role="img" aria-label={`Pote de ${product.name}`} className="product-crop aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${productsImage})`, backgroundPosition: product.imagePosition }} />
                </div>
                <h3 className="mt-3 min-h-10 text-xs font-semibold leading-snug sm:text-sm">{product.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                <p className="text-lg font-extrabold text-sale">{formatPrice(product.price)}</p>
                <p className="mb-3 text-[0.68rem] text-muted-foreground">6x de {formatPrice(product.price / 6)}</p>
                <div className="mt-auto grid gap-2">
                  <Button asChild size="sm" className="h-auto min-h-9 w-full whitespace-normal px-2 py-2 text-[0.68rem] sm:text-xs">
                    <Link to="/produto/$slug" params={{ slug: product.slug }}>Ver detalhes</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto min-h-9 w-full whitespace-normal px-2 py-2 text-[0.68rem] sm:text-xs" onClick={() => addToCart(product.id)}>Adicionar ao carrinho</Button>
                </div>
              </article>
            ))}
          </div>
        ) : <div className="border-y border-border py-16 text-center"><Search className="mx-auto mb-3 h-7 w-7 text-muted-foreground" /><p className="font-display text-2xl">Nenhum produto encontrado</p><p className="mt-1 text-sm text-muted-foreground">Tente outro termo ou categoria.</p></div>}

        <div className="mt-9 flex justify-center">
          <Button
            size="lg"
            variant={showAllProducts ? "outline" : "default"}
            className="h-12 rounded-full px-8"
            onClick={() => {
              setShowAllProducts((current) => !current);
              if (showAllProducts) document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {showAllProducts ? (
              <>
                <ArrowLeft /> Ver menos produtos
              </>
            ) : (
              <>
                Ver todos os produtos <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </section>


      <section className="relative min-h-[28rem] overflow-hidden sm:min-h-[25rem]">
        <img src={benefitsImage} alt="Cápsulas fitoterápicas, ervas e pó natural" width={1536} height={640} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[65%_center]" />
        <div className="absolute inset-0 bg-banner-overlay" />
        <div className="relative mx-auto grid min-h-[28rem] max-w-7xl items-center px-5 py-12 sm:min-h-[25rem] lg:grid-cols-2 lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl leading-tight text-primary sm:text-5xl">Cuidado natural<br />do seu jeito.</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/75">Suplementos, fitoterápicos e muito mais para uma vida mais saudável e equilibrada.</p>
            <div className="mt-6 grid max-w-md grid-cols-2 gap-3 text-xs font-medium">
              {["Mais disposição", "Sistema imunológico", "Equilíbrio e bem-estar", "Qualidade de vida"].map((item) => <span key={item} className="flex items-center gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-primary"><Leaf className="h-4 w-4" /></span>{item}</span>)}
            </div>
            <Button asChild className="mt-7 rounded-full"><a href="#produtos">Ver ofertas <ArrowRight /></a></Button>
          </div>
        </div>
      </section>

      <section aria-label="Vantagens" className="border-b border-border bg-muted/55">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-7 lg:grid-cols-4 lg:px-8">
          {benefits.map(({ icon: Icon, title, copy }, index) => <div key={title} className={`flex items-center gap-3 px-2 py-3 sm:px-5 ${index > 0 ? "lg:border-l lg:border-border" : ""}`}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-primary"><Icon className="h-5 w-5" /></span><span><strong className="block text-xs">{title}</strong><small className="text-[0.65rem] text-muted-foreground">{copy}</small></span></div>)}
        </div>
      </section>

      <section id="sobre" className="relative overflow-hidden py-14">
        <div className="leaf-decoration left-0" aria-hidden="true"><Leaf /></div><div className="leaf-decoration right-0 scale-x-[-1]" aria-hidden="true"><Leaf /></div>
        <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div><h2 className="font-display text-3xl sm:text-4xl">Por que escolher o Projeto Viva com Saúde?</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Há anos oferecendo produtos naturais e fitoterápicos com qualidade, segurança e confiança. Nosso compromisso é com a sua saúde e bem-estar.</p><Button asChild className="mt-6 rounded-full"><a href="#contato">Conheça nossa história <ArrowRight /></a></Button></div>
          <div className="grid grid-cols-3 gap-4">
            {[{ icon: Leaf, label: "Saúde Natural" }, { icon: CircleUserRound, label: "Clientes Satisfeitos" }, { icon: BadgeCheck, label: "Qualidade Comprovada" }].map(({ icon: Icon, label }) => <div key={label} className="text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-border bg-muted text-primary"><Icon className="h-7 w-7" /></span><span className="mt-2 block text-xs font-semibold">{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <div className="newsletter-grid overflow-hidden rounded-lg border border-border bg-muted/70 px-6 py-9 sm:px-10">
          <div className="flex items-start gap-4"><span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-soft text-primary"><Mail className="h-7 w-7" /></span><div><h2 className="font-display text-2xl sm:text-3xl">Receba nossas ofertas</h2><p className="mt-1 max-w-md text-sm text-muted-foreground">Cadastre seu e-mail e receba novidades, promoções e dicas de saúde e bem-estar.</p>
            {newsletterSent ? <p className="mt-5 font-semibold text-primary">Cadastro realizado com sucesso!</p> : <form onSubmit={submitNewsletter} className="mt-5 flex max-w-lg gap-2"><Input required type="email" aria-label="Seu melhor e-mail" placeholder="Seu melhor e-mail" className="h-11 bg-background" /><Button type="submit" className="h-11 px-6">Cadastrar</Button></form>}
          </div></div>
          <p className="font-script hidden max-w-sm rotate-[-5deg] text-center text-4xl leading-tight text-primary lg:block">Pequenas escolhas hoje,<br />grandes resultados amanhã.</p>
        </div>
      </section>

      <footer id="contato" className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.3fr_1.2fr] lg:px-8">
          <div><Brand /><p className="mt-4 text-xs text-muted-foreground">Saúde natural para uma vida melhor.</p></div>
          <FooterColumn title="Institucional" links={["Início", "Produtos", "Categorias", "Sobre nós", "Contato"]} />
          <FooterColumn title="Atendimento" links={["Fale conosco", "Política de privacidade", "Trocas e devoluções", "Formas de pagamento", "Entrega"]} />
          <div><h3 className="text-sm font-bold">Contato</h3><ul className="mt-4 space-y-3 text-xs text-muted-foreground"><li>(XX) XXXXX-XXXX</li><li className="break-all">contato@projetovivacomsaude.com.br</li><li>Brasil</li></ul></div>
          <div><h3 className="text-sm font-bold">Compra protegida</h3><div className="mt-4 flex gap-2"><span className="payment-mark">VISA</span><span className="payment-mark">MC</span><span className="payment-mark">ELO</span><span className="payment-mark">PIX</span></div><div className="mt-4 flex items-center gap-2 rounded-md bg-brand-soft p-3 text-primary"><ShieldCheck className="h-8 w-8" /><span className="text-[0.65rem] font-bold uppercase">Site protegido<br />SSL certificado</span></div></div>
        </div>
        <div className="border-t border-border bg-muted/60"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[0.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 Projeto Viva com Saúde. Todos os direitos reservados.</span><span>Feito com cuidado por quem acredita em uma vida mais saudável.</span></div></div>
      </footer>

      <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition-transform hover:scale-105"><span className="text-lg font-black">W</span></a>
    </main>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return <div><h3 className="text-sm font-bold">{title}</h3><ul className="mt-4 space-y-2 text-xs text-muted-foreground">{links.map((link) => <li key={link}><a href="#inicio" className="hover:text-primary">{link}</a></li>)}</ul></div>;
}