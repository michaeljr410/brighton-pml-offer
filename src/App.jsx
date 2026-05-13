import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  TrendingUp,
  DollarSign,
  Home,
  CheckCircle2,
  ArrowDown,
  Lock,
  BarChart3,
  Clock,
  MapPin,
  Building2,
  Percent,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";

function Section({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="stat-card rounded-2xl p-6 text-center">
      <Icon className="w-8 h-8 text-oriole-orange mx-auto mb-3" />
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-semibold text-oriole-orange uppercase tracking-wider">
        {label}
      </div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <CheckCircle2 className="w-5 h-5 text-oriole-orange shrink-0 mt-0.5" />
      <span className="text-gray-300 text-sm leading-relaxed">{children}</span>
    </div>
  );
}

function CapitalRow({ position, holder, amount, terms, highlight }) {
  return (
    <div
      className={`grid grid-cols-4 gap-4 py-4 px-4 rounded-xl text-sm ${
        highlight
          ? "bg-oriole-orange/10 border border-oriole-orange/30"
          : "border border-white/5"
      }`}
    >
      <div className={highlight ? "text-oriole-orange font-bold" : "text-gray-400"}>
        {position}
      </div>
      <div className="text-white">{holder}</div>
      <div className="text-white font-semibold">{amount}</div>
      <div className="text-gray-400">{terms}</div>
    </div>
  );
}

function TimelineStep({ month, title, desc, active }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            active
              ? "bg-oriole-orange text-white"
              : "bg-white/10 text-gray-400 border border-white/10"
          }`}
        >
          {month}
        </div>
        <div className="w-px h-full bg-white/10 min-h-[24px]" />
      </div>
      <div className="pb-6">
        <div className="text-white font-semibold text-sm">{title}</div>
        <div className="text-gray-400 text-xs mt-1">{desc}</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-oriole-black text-white overflow-x-hidden">
      {/* Hero */}
      <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-oriole-orange/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oriole-orange/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-oriole-orange mb-8">
              <Lock className="w-3.5 h-3.5" />
              SECURED REAL ESTATE NOTE
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Park Your Money.
            <br />
            <span className="gradient-text">Earn 12%.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto"
          >
            A private real estate note backed by a recorded deed of trust.
            Interest-only. Paid monthly. Your capital works while you don't.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#offer"
              className="px-8 py-4 bg-oriole-orange hover:bg-oriole-orange-light text-white font-semibold rounded-xl transition-all duration-300 pulse-glow flex items-center gap-2"
            >
              View the Opportunity
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#security"
              className="px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Your Protections
            </a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-5 h-5 text-oriole-orange/50" />
        </motion.div>
      </header>

      {/* Quick Stats */}
      <Section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Percent} label="Annual Return" value="12%" sub="Interest-only" />
          <StatCard
            icon={DollarSign}
            label="Monthly Income"
            value="$850"
            sub="Paid every month"
          />
          <StatCard icon={Clock} label="Term" value="12 mo" sub="With extension option" />
          <StatCard
            icon={Shield}
            label="Security"
            value="Deed of Trust"
            sub="Recorded lien"
          />
        </div>
      </Section>

      {/* The Offer */}
      <Section id="offer" className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Offer</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A straightforward private money lending opportunity. You lend. You
            earn. You're secured.
          </p>
        </div>

        <div className="glass rounded-2xl p-8 shimmer">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Loan Amount", "$85,000"],
              ["Annual Return", "12%"],
              ["Structure", "Interest-Only"],
              ["Term", "12 Months"],
              ["Monthly Payment to You", "$850/mo"],
              ["Total Return at Payoff", "$10,200"],
              ["Security", "Subordinate Deed of Trust"],
              ["Lien Position", "2nd Position"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-gray-400 text-sm">{label}</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-oriole-orange/10 border border-oriole-orange/20">
            <p className="text-center text-sm text-gray-300">
              <span className="text-oriole-orange font-bold">$850 deposited to your account every month</span>
              {" "}&mdash; not accrued, not deferred. You get paid from month one.
            </p>
          </div>
        </div>
      </Section>

      {/* The Property */}
      <Section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Property</h2>
          <div className="inline-flex items-center gap-2 text-oriole-orange">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">
              3221 Brighton St, Baltimore, MD 21216
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-oriole-orange" />
              Property Details
            </h3>
            {[
              ["Type", "Row Home (Attached)"],
              ["Current Config", "3 BR / 1 BA"],
              ["Post-Renovation", "4 Rooms / 2 Bathrooms"],
              ["Strategy", "Co-Living Conversion"],
              ["Neighborhood", "Rosemont"],
              ["Annual Taxes", "$1,107"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-gray-400">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-oriole-orange" />
              Acquisition
            </h3>
            {[
              ["Purchase Price", "$99,000"],
              ["Acquisition Type", "Subject-To"],
              ["Existing Loan", "$87,000 @ 4%"],
              ["Monthly PITI", "~$760"],
              ["Remaining Term", "12 Years"],
              ["Seller Down Payment", "$7,000"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-gray-400">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Capital Stack */}
      <Section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Capital Stack</h2>
          <p className="text-gray-400">
            Where your money sits &mdash; and what protects it.
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div>Position</div>
            <div>Holder</div>
            <div>Amount</div>
            <div>Terms</div>
          </div>
          <CapitalRow
            position="1st Lien"
            holder="M&T Bank (FHA)"
            amount="$87,000"
            terms="4% fixed — stays in place"
          />
          <CapitalRow
            position="2nd Lien"
            holder="You (PML)"
            amount="$85,000"
            terms="12% I/O — 12 months"
            highlight
          />
          <div className="grid grid-cols-4 gap-4 py-4 px-4 rounded-xl bg-white/5 text-sm font-bold">
            <div className="text-white">Total Basis</div>
            <div />
            <div className="text-white">$172,000</div>
            <div className="text-gray-400">ARV: $175K–$200K</div>
          </div>
        </div>
      </Section>

      {/* Income */}
      <Section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Income After Renovation
          </h2>
          <p className="text-gray-400">
            Four independent income streams. Your payment is covered from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-oriole-orange" />
              Monthly Rental Income
            </h3>
            {[
              ["Room 1 — Shared Bath", "$625"],
              ["Room 2 — Shared Bath", "$625"],
              ["Room 3 — Shared Bath", "$625"],
              ["Room 4 — Private Bath + Entrance", "$675"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-gray-400">{k}</span>
                <span className="text-green-400 font-semibold">{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-3 mt-2 text-base">
              <span className="text-white font-bold">Gross Monthly</span>
              <span className="text-green-400 font-bold">$2,550</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-oriole-orange" />
              Cash Flow Analysis
            </h3>
            {[
              ["Gross Income", "$2,550", false],
              ["Vacancy (10%)", "-$255", true],
              ["Repairs (10%)", "-$255", true],
              ["1st Lien PITI", "-$760", true],
              ["PML Interest (You)", "-$850", true],
            ].map(([k, v, neg]) => (
              <div key={k} className="flex justify-between py-2 border-b border-white/5 text-sm">
                <span className="text-gray-400">{k}</span>
                <span className={neg ? "text-red-400" : "text-green-400"}>{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-3 mt-2 text-base">
              <span className="text-white font-bold">Net Cash Flow</span>
              <span className="text-green-400 font-bold">~$430/mo</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              The property cash flows even with your $850/mo payment active. You
              are not dependent on a sale or refi to get paid.
            </p>
          </div>
        </div>
      </Section>

      {/* Security */}
      <Section id="security" className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Protections
          </h2>
          <p className="text-gray-400">
            Every dollar is backed by real property and real legal protection.
          </p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <CheckItem>
              Subordinate Deed of Trust &mdash; recorded against the property in
              Baltimore City
            </CheckItem>
            <CheckItem>
              Title commitment in hand (Sanctuary Title / Westcor)
            </CheckItem>
            <CheckItem>
              Insurance naming you as loss payee + additional insured
            </CheckItem>
            <CheckItem>Weekly status updates with progress photos</CheckItem>
            <CheckItem>
              10-year refinance obligation with cure periods
            </CheckItem>
            <CheckItem>
              Land trust structure (443 Innovative Solutions LLC as Trustee)
            </CheckItem>
            <CheckItem>
              DSCR well above refi threshold &mdash; clear exit path
            </CheckItem>
            <CheckItem>
              Four independent income streams reduce vacancy risk to near zero
            </CheckItem>
          </div>
        </div>
      </Section>

      {/* Exit Strategy */}
      <Section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How You Get Paid Back
          </h2>
          <p className="text-gray-400">
            DSCR refinance at month 12. Straightforward exit with multiple
            backups.
          </p>
        </div>

        <div className="glass rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">$150,000</div>
              <div className="text-xs text-gray-400">Refi at 75% of $200K ARV</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">-$87,000</div>
              <div className="text-xs text-gray-400">Pay off 1st lien</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-oriole-orange mb-1">
                $63,000
              </div>
              <div className="text-xs text-gray-400">Available toward your $85K</div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-white/5 text-center">
            <p className="text-sm text-gray-300">
              Remaining ~$22K gap closed by 12 months of accumulated cash flow
              (~$5,160) + modest PML term extension or cash injection from
              portfolio income. At conservative $175K ARV, refi yields $44K
              toward PML &mdash; still serviceable with cash flow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            [
              "DSCR Refinance",
              "Primary exit. Strong DSCR qualifies for conventional refi at 12 months.",
            ],
            [
              "Term Extension",
              "Negotiate continued 12% I/O or modified terms if timing shifts.",
            ],
            [
              "Cash Flow Paydown",
              "$430/mo net cash flow pays down balance over time.",
            ],
            [
              "Sale at ARV",
              "$175K–$200K sale covers all debt with proceeds to spare.",
            ],
          ].map(([title, desc]) => (
            <div key={title} className="glass rounded-xl p-5">
              <div className="text-white font-semibold text-sm mb-1">{title}</div>
              <div className="text-gray-400 text-xs">{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="px-6 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Timeline</h2>
        </div>
        <div className="pl-4">
          <TimelineStep
            month="0"
            title="Close of Escrow"
            desc="PML funds deployed. Renovation begins immediately."
            active
          />
          <TimelineStep
            month="1-2"
            title="Full Renovation"
            desc="Basement finish, bathrooms, bedrooms, HVAC, kitchen, paint. Your $850/mo paid from reserves."
          />
          <TimelineStep
            month="3"
            title="Lease-Up"
            desc="Rooms listed and filled. Partial income begins flowing."
          />
          <TimelineStep
            month="4"
            title="Stabilized"
            desc="All 4 rooms rented. Full $2,550/mo income. Your $850/mo paid from cash flow."
            active
          />
          <TimelineStep
            month="12"
            title="Refinance & Payoff"
            desc="DSCR refi executes. Your $85,000 is returned plus $10,200 in total interest earned."
            active
          />
        </div>
      </Section>

      {/* Borrower */}
      <Section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Borrower</h2>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Mike Davis</h3>
            <p className="text-oriole-orange text-sm font-medium">
              443 Innovative Solutions LLC
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ["200+", "Creative Finance Deals Closed"],
              ["SellFi", "Founder — Creative Finance Platform"],
              ["T.O.P. Method", "Creator — Deal Evaluation System"],
              ["Active TC Team", "Aimee & Julie Execute Daily"],
              ["Baltimore Local", "Boots on the Ground"],
              ["$184K+ Revenue", "AIOS Blueprint AI Product"],
            ].map(([val, label]) => (
              <div key={label} className="text-center p-4 rounded-xl bg-white/5">
                <div className="text-lg font-bold text-white">{val}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Entity */}
      <Section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-oriole-orange" />
            Legal Entity Details
          </h3>
          {[
            ["Borrowing Entity", "443 Innovative Solutions LLC"],
            ["Role", "Trustee — Brighton Street Land Trust"],
            ["Principal", "Darnell Michael Davis Jr (Mike Davis)"],
            ["EIN", "41-5150152"],
            ["Maryland SDAT", "W27058593 — Active / Good Standing"],
            [
              "Registered Address",
              "20 S Charles St, Ste 403 #2947, Baltimore, MD 21201",
            ],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-3 border-b border-white/5 text-sm">
              <span className="text-gray-400">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="px-6 py-24 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Put Your Capital to Work?
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          This is a private real estate note &mdash; not a securities offering.
          Secured by a recorded deed of trust. 12% annual return, paid monthly.
          Let's talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:vivantinvestments@gmail.com"
            className="px-8 py-4 bg-oriole-orange hover:bg-oriole-orange-light text-white font-semibold rounded-xl transition-all duration-300 pulse-glow"
          >
            Contact Mike Davis
          </a>
          <a
            href="tel:4432432806"
            className="px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            Call: 443-243-2806
          </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-gray-600 leading-relaxed">
            This is not a securities offering. This is a private real estate
            loan secured by a recorded deed of trust. No guarantees of return
            are made or implied. Past performance does not guarantee future
            results. Prospective lenders should conduct their own due diligence.
          </p>
          <p className="text-xs text-gray-700 mt-4">
            443 Innovative Solutions LLC &middot; Brighton Street Land Trust
            &middot; Baltimore, MD
          </p>
        </div>
      </footer>
    </div>
  );
}
