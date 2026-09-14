import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  CircleUserRound,
  CreditCard,
  Heart,
  Leaf,
  Menu,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex shrink-0 items-center gap-2" aria-label="Projeto Viva com Saúde — início">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-primary transition-transform group-hover:-rotate-6">
        <Sprout className="h-7 w-7" strokeWidth={1.7} />
      </span>
      <span className={compact ? "hidden sm:block" : "block"}>
        <span className="block text-[0.58rem] font-semibold uppercase leading-none text-muted-foreground">Projeto</span>
        <span className="font-display block text-xl leading-[0.86] text-foreground">
          Viva com
          <br />
          Saúde
        </span>
        <span className="mt-1 block text-[0.42rem] font-bold uppercase text-muted-foreground">Produtos fitoterápicos</span>
      </span>
    </Link>
  );
}

const topBarItems = [
  { icon: Truck, label: "Frete para todo o Brasil" },
  { icon: ShieldCheck, label: "Compra 100% segura" },
  { icon: CreditCard, label: "Parcele em até 6x" },
  { icon: Leaf, label: "Produtos naturais e originais" },
];

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-primary-foreground/15 px-4 sm:grid-cols-4 lg:px-8">
        {topBarItems.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex h-9 items-center justify-center gap-2 px-2 text-center text-[0.65rem] font-medium sm:text-xs"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto grid min-h-20 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 lg:px-8">
        <Brand compact />
        <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Navegação principal">
          <Link to="/" className="nav-link">
            Início
          </Link>
          <Link to="/" hash="produtos" className="nav-link">
            Produtos
          </Link>
          <Link to="/" hash="categorias" className="nav-link inline-flex items-center gap-1">
            Categorias <ChevronDown className="h-3 w-3" />
          </Link>
          <Link to="/" hash="sobre" className="nav-link">
            Sobre
          </Link>
          <Link to="/" hash="contato" className="nav-link">
            Contato
          </Link>
        </nav>
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <label className="relative hidden w-64 xl:block">
            <span className="sr-only">Buscar produtos</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="O que você está procurando?" className="h-10 rounded-full border-0 bg-muted pl-9 pr-8 shadow-none" />
          </label>
          <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Minha conta">
            <CircleUserRound />
          </Button>
          <Button variant="ghost" size="icon" className="hidden rounded-full sm:inline-flex" aria-label="Favoritos">
            <Heart />
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-full" aria-label={`Carrinho com ${cartCount} itens`}>
            <ShoppingCart />
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
              {cartCount}
            </span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Abrir menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[86%]">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <Brand />
                </SheetTitle>
                <SheetDescription>Navegue pela loja.</SheetDescription>
              </SheetHeader>
              <nav className="mt-8 grid gap-1">
                {["Início", "Produtos", "Categorias", "Sobre", "Contato"].map((label, index) => (
                  <Link
                    key={label}
                    to="/"
                    {...(index === 0 ? {} : { hash: ["", "produtos", "categorias", "sobre", "contato"][index]! })}
                    className="border-b border-border py-4 text-base font-semibold"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold">{title}</h3>
      <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
        {links.map((link) => (
          <li key={link}>
            <Link to="/" className="hover:text-primary">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-9 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.3fr_1.2fr] lg:px-8">
        <div>
          <Brand />
          <p className="mt-4 text-xs text-muted-foreground">Saúde natural para uma vida melhor.</p>
        </div>
        <FooterColumn title="Institucional" links={["Início", "Produtos", "Categorias", "Sobre nós", "Contato"]} />
        <FooterColumn
          title="Atendimento"
          links={["Fale conosco", "Política de privacidade", "Trocas e devoluções", "Formas de pagamento", "Entrega"]}
        />
        <div>
          <h3 className="text-sm font-bold">Contato</h3>
          <ul className="mt-4 space-y-3 text-xs text-muted-foreground">
            <li>(XX) XXXXX-XXXX</li>
            <li className="break-all">contato@projetovivacomsaude.com.br</li>
            <li>Brasil</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold">Formas de pagamento</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="payment-mark">VISA</span>
            <span className="payment-mark">MC</span>
            <span className="payment-mark">ELO</span>
            <span className="payment-mark">PIX</span>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md bg-brand-soft p-3 text-primary">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-[0.65rem] font-bold uppercase">
              Site protegido
              <br />
              SSL certificado
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-border bg-muted/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[0.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 Projeto Viva com Saúde. Todos os direitos reservados.</span>
          <span>Feito com cuidado por quem acredita em uma vida mais saudável.</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <span className="text-lg font-black">W</span>
    </a>
  );
}
