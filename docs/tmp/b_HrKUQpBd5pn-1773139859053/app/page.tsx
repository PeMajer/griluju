"use client"

import { useState } from "react"
import { Menu, X, ChevronRight, Lock, Clock, ArrowRight, Mail, Flame } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Sticky Navigation
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E4E0]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Flame className="h-7 w-7 text-[#F97316]" />
            <span className="text-xl font-bold text-[#1C1917]" style={{ fontFamily: 'Georgia, serif' }}>
              griluju.cz
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors text-[15px]">
              Recepty
            </a>
            <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors text-[15px]">
              Techniky
            </a>
            <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors text-[15px]">
              Vybavení
            </a>
            <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors text-[15px]">
              O nás
            </a>
          </div>

          {/* Search & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-[#E8E4E0] text-[#78716C] hover:border-[#F97316] hover:text-[#F97316]"
            >
              Hledat
            </Button>
            <Button className="bg-[#F97316] hover:bg-[#C2410C] text-white">
              Newsletter
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#1C1917]" />
            ) : (
              <Menu className="h-6 w-6 text-[#1C1917]" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E4E0]">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors py-2">
                Recepty
              </a>
              <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors py-2">
                Techniky
              </a>
              <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors py-2">
                Vybavení
              </a>
              <a href="#" className="text-[#1C1917] hover:text-[#F97316] transition-colors py-2">
                O nás
              </a>
              <Button className="bg-[#F97316] hover:bg-[#C2410C] text-white w-full mt-2">
                Newsletter
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Article Header
function ArticleHeader() {
  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#78716C] mb-6">
        <a href="#" className="hover:text-[#F97316] transition-colors">Domů</a>
        <ChevronRight className="h-4 w-4" />
        <a href="#" className="hover:text-[#F97316] transition-colors">Recepty</a>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#1C1917]">Pulled Pork</span>
      </nav>

      {/* Category badge */}
      <span 
        className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-[#FFF7ED] text-[#F97316] rounded mb-4"
        style={{ fontFamily: 'monospace' }}
      >
        Recept
      </span>

      {/* Title */}
      <h1 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] leading-tight mb-6 text-balance"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Pulled Pork: kompletní průvodce pro domácí gril
      </h1>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-[#78716C] mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#F5F0E8] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
              alt="Petr Majer"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-[#1C1917]">Petr Majer</span>
        </div>
        <span className="text-[#E8E4E0]">|</span>
        <span>15. března 2024</span>
        <span className="text-[#E8E4E0]">|</span>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>12 minut čtení</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative aspect-video rounded-lg overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
        <Image
          src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200&h=675&fit=crop"
          alt="Pulled pork na grilu"
          fill
          className="object-cover"
          priority
        />
      </div>
    </header>
  )
}

// Temperature Box Component
function TempBox({ temp }: { temp: string }) {
  return (
    <span 
      className="inline-block px-2 py-0.5 bg-[#F5F0E8] rounded text-[#1C1917] text-sm"
      style={{ fontFamily: 'monospace' }}
    >
      {temp}
    </span>
  )
}

// Article Body
function ArticleBody() {
  return (
    <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose-custom">
        {/* H2 */}
        <h2 
          className="text-2xl sm:text-3xl font-bold text-[#1C1917] mb-6 mt-0"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Proč je pulled pork král BBQ
        </h2>

        {/* Paragraph */}
        <p className="text-[17px] leading-[1.75] text-[#1C1917] mb-6">
          Pulled pork, neboli trhané vepřové, patří mezi absolutní klasiku amerického BBQ. 
          Jde o vepřovou plec nebo kýtu pomalu uzenou při nízké teplotě, dokud se maso doslova 
          nerozpadá pod rukama. V Česku si tuto techniku zamilovali grilovací nadšenci, kteří 
          objevili kouzlo „low and slow" přístupu.
        </p>

        <p className="text-[17px] leading-[1.75] text-[#1C1917] mb-6">
          Tajemství dokonalého pulled porku spočívá v trpělivosti. Počítejte s tím, že příprava 
          zabere minimálně 8–12 hodin, ale výsledek stojí za každou minutu čekání. Maso nasákne 
          kouřovým aroma, kůrčička zkaramelizuje do nádherné barvy a vnitřek zůstane neuvěřitelně 
          šťavnatý.
        </p>

        {/* Blockquote */}
        <blockquote className="border-l-4 border-[#F97316] pl-6 py-2 my-8 italic text-[#78716C]">
          „Pulled pork není jen jídlo – je to zážitek. Když otevřete poklop grilu a ucítíte tu vůni, 
          pochopíte, proč se tomuhle říká BBQ zen."
        </blockquote>

        {/* H3 */}
        <h3 
          className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-4 mt-10"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Co budete potřebovat
        </h3>

        {/* Unordered list */}
        <ul className="list-disc list-outside ml-6 mb-8 space-y-2 text-[17px] leading-[1.75] text-[#1C1917]">
          <li>Vepřová plec s kostí (2–3 kg) – kost dodá šťávu a chuť</li>
          <li>Suchý rub – kombinace paprika, hnědý cukr, česnek, kmín</li>
          <li>Dřevěné štěpky na uzení – ideálně hickory nebo jabloň</li>
          <li>BBQ omáčka na dokončení – vinegar-based pro autentický výsledek</li>
          <li>Teploměr s sondou – bez něj se neobejdete</li>
        </ul>

        {/* H3 */}
        <h3 
          className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-4 mt-10"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Správné teploty jsou základ
        </h3>

        <p className="text-[17px] leading-[1.75] text-[#1C1917] mb-6">
          Při přípravě pulled porku pracujeme s poměrně nízkou teplotou grilu – ideálně mezi{" "}
          <TempBox temp="107 °C" /> a <TempBox temp="120 °C" />. Cílová vnitřní teplota masa 
          je <TempBox temp="93–96 °C" />, kdy se kolagen přemění na želatinu a maso se začne 
          rozpadat.
        </p>

        {/* Temperature table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#E8E4E0]">
                <th className="text-left py-3 pr-4 text-[#1C1917] font-semibold">Fáze</th>
                <th className="text-left py-3 px-4 text-[#1C1917] font-semibold">Teplota grilu</th>
                <th className="text-left py-3 pl-4 text-[#1C1917] font-semibold">Vnitřní teplota</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'monospace' }}>
              <tr className="border-b border-[#E8E4E0]">
                <td className="py-3 pr-4 text-[#1C1917]" style={{ fontFamily: 'system-ui' }}>Začátek uzení</td>
                <td className="py-3 px-4 text-[#1C1917]">110 °C</td>
                <td className="py-3 pl-4 text-[#78716C]">—</td>
              </tr>
              <tr className="border-b border-[#E8E4E0]">
                <td className="py-3 pr-4 text-[#1C1917]" style={{ fontFamily: 'system-ui' }}>Stall (plateau)</td>
                <td className="py-3 px-4 text-[#1C1917]">110 °C</td>
                <td className="py-3 pl-4 text-[#1C1917]">65–74 °C</td>
              </tr>
              <tr className="border-b border-[#E8E4E0]">
                <td className="py-3 pr-4 text-[#1C1917]" style={{ fontFamily: 'system-ui' }}>Texas crutch</td>
                <td className="py-3 px-4 text-[#1C1917]">120 °C</td>
                <td className="py-3 pl-4 text-[#1C1917]">74–85 °C</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#1C1917]" style={{ fontFamily: 'system-ui' }}>Hotovo</td>
                <td className="py-3 px-4 text-[#1C1917]">—</td>
                <td className="py-3 pl-4 text-[#F97316] font-bold">93–96 °C</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* HR */}
        <hr className="my-10 border-t border-[#E8E4E0]" />

        {/* More content */}
        <h3 
          className="text-xl sm:text-2xl font-bold text-[#1C1917] mb-4 mt-10"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Krok za krokem
        </h3>

        <p className="text-[17px] leading-[1.75] text-[#1C1917] mb-6">
          Den předem maso opláchněte a osušte. Potřete tenkou vrstvou hořčice (pomůže rubu 
          přilnout) a důkladně jej zasypte suchým rubem. Zabalte do fólie a nechte přes noc 
          v lednici marinovat.
        </p>

        <p className="text-[17px] leading-[1.75] text-[#1C1917] mb-6">
          Ráno vytáhněte maso z lednice hodinu před uzením, aby se vyrovnala teplota. 
          Připravte si gril na nepřímé grilování a nasypte štěpky. Jakmile se teplota ustálí 
          na <TempBox temp="110 °C" />, vložte maso a zavřete poklop.
        </p>

        <p className="text-[17px] leading-[1.75] text-[#1C1917] mb-6">
          Po několika hodinách narazíte na tzv. stall – teplota masa se zastaví někde kolem{" "}
          <TempBox temp="68–74 °C" /> a zdánlivě se nehýbe. Nebojte se, je to normální. Můžete 
          buď čekat, nebo použít techniku „Texas crutch" – zabalte maso do alobalu či 
          řeznického papíru a pokračujte v uzení.
        </p>

        {/* Affiliate disclosure */}
        <div className="my-10 p-4 border border-[#E8E4E0] rounded-lg bg-white">
          <div className="flex items-start gap-3">
            <Lock className="h-4 w-4 text-[#78716C] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#78716C]">
              Článek obsahuje affiliate odkazy. Nakoupíte-li přes ně, dostanu malou provizi – 
              vám to nic navíc nestojí a mně pomůžete udržet tento web v chodu.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

// Author Bio Block
function AuthorBio() {
  return (
    <section className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-[#F5F0E8] rounded-xl">
        <div className="w-20 h-20 rounded-full bg-white overflow-hidden flex-shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face"
            alt="Petr Majer"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 
            className="text-xl font-bold text-[#1C1917] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Petr Majer
          </h3>
          <p className="text-[#78716C] leading-relaxed mb-3">
            Grilovací nadšenec s desetiletou praxí. Specializuji se na low-and-slow techniky 
            a americké BBQ. Když zrovna nestojím u grilu, píšu o něm.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-1 text-[#F97316] hover:text-[#C2410C] font-medium transition-colors"
          >
            Číst více <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// Related Articles
function RelatedArticles() {
  const articles = [
    {
      title: "Beef Brisket: 14 hodin k dokonalosti",
      category: "Recept",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
      readTime: "15 min",
    },
    {
      title: "Jak vybrat první smoker: průvodce pro začátečníky",
      category: "Vybavení",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
      readTime: "8 min",
    },
    {
      title: "Domácí BBQ omáčka: 5 receptů na léto",
      category: "Recept",
      image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&h=400&fit=crop",
      readTime: "6 min",
    },
  ]

  return (
    <section className="bg-[#F5F0E8] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-2xl sm:text-3xl font-bold text-[#1C1917] mb-8"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Mohlo by vás zajímat
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <a 
              key={index}
              href="#"
              className="group bg-white rounded-lg overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span 
                  className="inline-block px-2 py-0.5 text-xs font-medium uppercase tracking-wider bg-[#FFF7ED] text-[#F97316] rounded mb-3"
                  style={{ fontFamily: 'monospace' }}
                >
                  {article.category}
                </span>
                <h3 
                  className="text-lg font-bold text-[#1C1917] mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {article.title}
                </h3>
                <span className="text-sm text-[#78716C]">{article.readTime} čtení</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Newsletter CTA
function NewsletterCTA() {
  return (
    <section className="py-16 bg-[#FAFAF8]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 bg-[#FFF7ED] rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="h-6 w-6 text-[#F97316]" />
        </div>
        <h2 
          className="text-2xl sm:text-3xl font-bold text-[#1C1917] mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Recepty přímo do schránky
        </h2>
        <p className="text-[#78716C] mb-8 max-w-md mx-auto">
          Jednou týdně posílám nový recept, tip na vybavení nebo grilovací techniku. 
          Žádný spam, jen čisté BBQ.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="vas@email.cz"
            className="flex-1 border-[#E8E4E0] focus:border-[#F97316] focus:ring-[#F97316]"
          />
          <Button className="bg-[#F97316] hover:bg-[#C2410C] text-white px-6">
            Odebírat
          </Button>
        </form>
        <p className="text-xs text-[#78716C] mt-4">
          Přihlášením souhlasíte se zpracováním e-mailu. Odhlásit se můžete kdykoliv.
        </p>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#1C1917] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-[#F97316]" />
              <span className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                griluju.cz
              </span>
            </div>
            <p className="text-[#A8A29E] text-sm leading-relaxed">
              Váš průvodce světem grilování. Od receptů po vybavení.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#78716C]">
              Obsah
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Recepty</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Techniky</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Vybavení</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Tipy & triky</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#78716C]">
              O webu
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li><a href="#" className="hover:text-[#F97316] transition-colors">O nás</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Kontakt</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Spolupráce</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Podpořte nás</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#78716C]">
              Právní
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Ochrana soukromí</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-[#F97316] transition-colors">Podmínky užití</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#78716C]">
            © 2024 griluju.cz. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#78716C] hover:text-[#F97316] transition-colors" aria-label="Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-[#78716C] hover:text-[#F97316] transition-colors" aria-label="YouTube">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="text-[#78716C] hover:text-[#F97316] transition-colors" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navigation />
      <main>
        <ArticleHeader />
        <ArticleBody />
        <AuthorBio />
        <RelatedArticles />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  )
}
