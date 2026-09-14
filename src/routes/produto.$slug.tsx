import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  Copy,
  Facebook,
  Flame,
  Heart,
  HeartPulse,
  Leaf,
  Link2,
  Maximize2,
  Minus,
  PackageCheck,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import productsImage from "@/assets/viva-products.jpg";
import { SiteFooter, SiteHeader, TopBar, WhatsAppFab } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { formatPrice, getProductBySlug, products } from "@/data/products";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Produto não encontrado | Viva com Saúde" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} | Projeto Viva com Saúde`;
    return {
      meta: [
        { title },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: title },
        { property: "og:description", content: product.shortDescription },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div role="alert" className="p-10 text-center">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center p-10 text-center">
      <div>
        <h1 className="font-display text-4xl">Produto não encontrado</h1>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/" hash="produtos">
            Ver todos os produtos
          </Link>
        </Button>
      </div>
    </div>
  ),
  component: ProductPage,
});

const benefitIcons = [Leaf, Flame, HeartPulse, Heart];
const tabs = ["Descrição", "Benefícios", "Composição", "Modo de uso", "Avaliações"] as const;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Nota ${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
        />
      ))}
    </span>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Descrição");
  const [favorite, setFavorite] = useState(false);

  const related = products.filter((item) => item.slug !== product.slug).slice(0, 5);
  const gallery = product.galleryPositions;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <TopBar />
      <SiteHeader cartCount={0} />

      <nav aria-label="Você está em" className="mx-auto max-w-7xl px-4 pb-2 pt-5 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-primary">
              Início
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link to="/" hash="produtos" className="hover:text-primary">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="font-semibold text-foreground">{product.name}</li>
        </ol>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        {/* Galeria */}
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            {gallery.map((position, index) => (
              <button
                key={position + index}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Ver imagem ${index + 1} de ${product.name}`}
                aria-pressed={activeImage === index}
                className={`product-crop aspect-square w-full overflow-hidden rounded-md border transition-colors ${
                  activeImage === index ? "border-primary" : "border-border hover:border-primary/50"
                }`}
                style={{ backgroundImage: `url(${productsImage})`, backgroundPosition: position }}
              />
            ))}
            <span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
            </span>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-card">
            <span className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-bold text-primary-foreground">
              {product.discount}% OFF
            </span>
            <div
              role="img"
              aria-label={`Pote de ${product.name}`}
              className="product-crop aspect-[4/5] w-full"
              style={{ backgroundImage: `url(${productsImage})`, backgroundPosition: gallery[activeImage] }}
            />
            <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-primary shadow-card">
              <Maximize2 className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Informações */}
        <div className="min-w-0">
          <h1 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Stars rating={product.rating} />
            <span>({product.reviews} avaliações)</span>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">{product.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-base text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
            <strong className="text-4xl font-extrabold text-primary">{formatPrice(product.price)}</strong>
            <span className="rounded-full bg-primary px-3 py-1 text-[0.7rem] font-bold text-primary-foreground">
              {product.discount}% OFF
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            ou {product.installments}x de {formatPrice(product.price / product.installments)} sem juros no cartão
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-border bg-card">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-md"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Diminuir quantidade"
              >
                <Minus />
              </Button>
              <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-md"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Aumentar quantidade"
              >
                <Plus />
              </Button>
            </div>
            <Button className="h-12 min-w-60 flex-1 rounded-md text-sm">
              <ShoppingCart /> Adicionar ao carrinho
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFavorite((value) => !value)}
              aria-pressed={favorite}
              aria-label="Adicionar aos favoritos"
              className="h-12 w-12 rounded-full"
            >
              <Heart className={favorite ? "fill-primary text-primary" : ""} />
            </Button>
          </div>

          <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {[
              { icon: PackageCheck, title: "Estoque", copy: "disponível" },
              { icon: Truck, title: "Entrega para", copy: "todo o Brasil" },
              { icon: ShieldCheck, title: "Compra 100%", copy: "segura" },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs leading-snug text-muted-foreground">
                  {title}
                  <br />
                  {copy}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-brand-soft/45 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-background text-primary">
              <Leaf className="h-6 w-6" />
            </span>
            <span>
              <strong className="block text-sm text-primary">Produto 100% natural</strong>
              <small className="text-xs text-muted-foreground">Qualidade e segurança para a sua saúde.</small>
            </span>
          </div>
        </div>
      </section>

      {/* Abas */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="rounded-lg border border-border bg-card shadow-card">
          <div
            role="tablist"
            aria-label="Informações do produto"
            className="category-scroll flex gap-2 overflow-x-auto border-b border-border px-4 sm:px-6"
          >
            {tabs.map((item) => {
              const label = item === "Avaliações" ? `Avaliações (${product.reviews})` : item;
              const active = tab === item;
              return (
                <button
                  key={item}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold transition-colors ${
                    active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            <div role="tabpanel" className="min-w-0">
              {tab === "Descrição" && (
                <>
                  <h2 className="font-display text-2xl sm:text-3xl">Descrição do produto</h2>
                  {product.description.map((paragraph) => (
                    <p key={paragraph} className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                  <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {product.benefits.map((benefit, index) => {
                      const Icon = benefitIcons[index % benefitIcons.length] ?? Leaf;
                      return (
                        <div key={benefit} className="text-center">
                          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-primary">
                            <Icon className="h-6 w-6" />
                          </span>
                          <span className="mt-2 block text-xs leading-snug text-muted-foreground">{benefit}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {tab === "Benefícios" && (
                <>
                  <h2 className="font-display text-2xl sm:text-3xl">Benefícios</h2>
                  <ul className="mt-4 grid gap-3">
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {tab === "Composição" && (
                <>
                  <h2 className="font-display text-2xl sm:text-3xl">Composição</h2>
                  <ul className="mt-4 grid gap-3">
                    {product.composition.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                          <Leaf className="h-4 w-4" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {tab === "Modo de uso" && (
                <>
                  <h2 className="font-display text-2xl sm:text-3xl">Modo de uso</h2>
                  <ol className="mt-4 grid gap-3">
                    {product.usage.map((step, index) => (
                      <li key={step} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {tab === "Avaliações" && (
                <>
                  <h2 className="font-display text-2xl sm:text-3xl">Avaliações dos clientes</h2>
                  <div className="mt-4 flex items-center gap-3">
                    <Stars rating={product.rating} />
                    <span className="text-sm text-muted-foreground">
                      {product.rating.toLocaleString("pt-BR")} de 5 · {product.reviews} avaliações
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    Clientes destacam a qualidade natural da fórmula, a entrega rápida e os resultados percebidos com o uso
                    contínuo.
                  </p>
                </>
              )}
            </div>

            <aside className="min-w-0 rounded-lg border border-border">
              <dl className="divide-y divide-border text-xs">
                {[
                  { icon: PackageCheck, term: "Categoria", value: product.category },
                  { icon: Sparkles, term: "SKU", value: product.sku },
                  { icon: ShieldCheck, term: "Disponibilidade", value: "Em estoque" },
                  { icon: Truck, term: "Entrega", value: "Para todo o Brasil" },
                  { icon: Leaf, term: "Formas de pagamento", value: "Cartão, Pix e Boleto" },
                ].map(({ icon: Icon, term, value }) => (
                  <div key={term} className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <dt className="flex min-w-0 items-center gap-2 text-muted-foreground">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate">{term}</span>
                    </dt>
                    <dd className={`shrink-0 font-semibold ${term === "Disponibilidade" ? "text-primary" : ""}`}>{value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                      <Share2 className="h-3.5 w-3.5" />
                    </span>
                    Compartilhar
                  </dt>
                  <dd className="flex gap-2">
                    {[Copy, Facebook, Link2].map((Icon, index) => (
                      <span
                        key={index}
                        className="grid h-8 w-8 place-items-center rounded-full border border-border text-primary"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <h2 className="mb-5 font-display text-3xl sm:text-4xl">Produtos relacionados</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {related.map((item) => (
            <article
              key={item.id}
              className="group flex min-w-0 flex-col rounded-md border border-border bg-card p-2.5 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-md bg-muted">
                <span className="absolute right-1.5 top-1.5 z-10 rounded-full bg-primary px-2 py-1 text-[0.62rem] font-bold text-primary-foreground">
                  {item.discount}% OFF
                </span>
                <div
                  role="img"
                  aria-label={`Pote de ${item.name}`}
                  className="product-crop aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${productsImage})`, backgroundPosition: item.imagePosition }}
                />
              </div>
              <h3 className="mt-3 min-h-10 text-xs font-semibold leading-snug sm:text-sm">{item.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground line-through">{formatPrice(item.oldPrice)}</p>
              <p className="text-lg font-extrabold text-sale">{formatPrice(item.price)}</p>
              <p className="mb-3 text-[0.68rem] text-muted-foreground">
                {item.installments}x de {formatPrice(item.price / item.installments)}
              </p>
              <Button asChild size="sm" className="mt-auto h-auto min-h-9 w-full whitespace-normal px-2 py-2 text-[0.68rem] sm:text-xs">
                <Link to="/produto/$slug" params={{ slug: item.slug }}>
                  Ver detalhes
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
