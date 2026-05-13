import React from 'react';

// ── Shared constants ──────────────────────────────────────────────
const ORANGE = '#DF4601';
const BG = '#000000';
const WHITE = '#FFFFFF';
const GRAY = '#999999';
const DARK_GRAY = '#1A1A1A';

const cardBase = {
  width: 1080,
  height: 1080,
  backgroundColor: BG,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: WHITE,
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

// ── Reusable tiny components ──────────────────────────────────────

function OrangeBar({ height = 6, style = {} }) {
  return (
    <div
      style={{
        width: '100%',
        height,
        backgroundColor: ORANGE,
        ...style,
      }}
    />
  );
}

function Watermark() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        right: 48,
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: GRAY,
        opacity: 0.5,
        textTransform: 'uppercase',
      }}
    >
      TOP Wheels
    </div>
  );
}

function CardNumber({ num, total = 5 }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 44,
        right: 48,
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: '0.12em',
        color: GRAY,
        opacity: 0.6,
      }}
    >
      {num}/{total}
    </div>
  );
}

function VerticalAccent() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 5,
        height: '100%',
        backgroundColor: ORANGE,
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// CARD 1 — HOOK
// ═══════════════════════════════════════════════════════════════════

export function Card1_Hook() {
  return (
    <div style={cardBase}>
      <VerticalAccent />
      <CardNumber num={1} />

      {/* Top spacer */}
      <div style={{ flex: 1 }} />

      {/* Content block */}
      <div style={{ padding: '0 72px' }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ORANGE,
            marginBottom: 28,
          }}
        >
          Real Estate Breakdown
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          CO-LIVING
          <br />
          IN BALTIMORE
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: GRAY,
            marginTop: 32,
            marginBottom: 0,
            lineHeight: 1.4,
          }}
        >
          Why I'm buying this row home
        </p>

        {/* Address pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 40,
            padding: '14px 28px',
            border: `1px solid ${ORANGE}33`,
            borderRadius: 8,
            backgroundColor: `${ORANGE}0D`,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: ORANGE,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: WHITE,
              letterSpacing: '0.04em',
            }}
          >
            3221 Brighton St &bull; Rosemont
          </span>
        </div>
      </div>

      {/* Bottom spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom bar */}
      <OrangeBar height={6} />

      <Watermark />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CARD 2 — THE NUMBERS
// ═══════════════════════════════════════════════════════════════════

function NumberRow({ label, value, highlight = false }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px 0',
        borderBottom: `1px solid ${WHITE}0D`,
      }}
    >
      <span
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: GRAY,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: highlight ? ORANGE : WHITE,
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function Card2_Numbers() {
  return (
    <div style={cardBase}>
      <VerticalAccent />
      <CardNumber num={2} />

      {/* Top section */}
      <div
        style={{
          padding: '60px 72px 0',
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ORANGE,
            marginBottom: 16,
          }}
        >
          The Numbers
        </div>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Deal Breakdown
        </h2>
      </div>

      {/* Spacer */}
      <div style={{ flex: 0.4 }} />

      {/* Number rows */}
      <div style={{ padding: '0 72px' }}>
        <NumberRow label="Purchase Price" value="$99,000" />
        <NumberRow label="4 Rooms" value="$2,550/mo Gross" highlight />
        <NumberRow label="Monthly Cash Flow" value="$430+" highlight />
      </div>

      {/* Bottom area */}
      <div style={{ flex: 1 }} />

      {/* Metric chip */}
      <div style={{ padding: '0 72px 48px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 24px',
            backgroundColor: DARK_GRAY,
            borderRadius: 8,
            border: `1px solid ${WHITE}0D`,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#22C55E',
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 500, color: GRAY }}>
            5.2% Cash-on-Cash Return
          </span>
        </div>
      </div>

      <OrangeBar height={6} />
      <Watermark />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CARD 3 — THE STRATEGY
// ═══════════════════════════════════════════════════════════════════

function StrategyItem({ icon, text, sub }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 24,
        padding: '28px 0',
        borderBottom: `1px solid ${WHITE}08`,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: `${ORANGE}1A`,
          border: `1px solid ${ORANGE}33`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: WHITE,
            lineHeight: 1.3,
          }}
        >
          {text}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: GRAY,
              marginTop: 8,
              lineHeight: 1.4,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

export function Card3_Strategy() {
  return (
    <div style={cardBase}>
      <VerticalAccent />
      <CardNumber num={3} />

      {/* Header */}
      <div style={{ padding: '60px 72px 0' }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ORANGE,
            marginBottom: 16,
          }}
        >
          The Strategy
        </div>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Subject-To
          <br />
          Acquisition
        </h2>
      </div>

      {/* Spacer */}
      <div style={{ flex: 0.3 }} />

      {/* Strategy items */}
      <div style={{ padding: '0 72px' }}>
        <StrategyItem
          icon={<span style={{ color: ORANGE }}>%</span>}
          text="Existing Loan: $87K @ 4%"
          sub="Taking over the seller's mortgage"
        />
        <StrategyItem
          icon={<span style={{ color: ORANGE }}>+</span>}
          text="Converting 3BR/1BA"
          sub="Adding a 4th room for co-living"
        />
        <StrategyItem
          icon={<span style={{ color: ORANGE }}>$</span>}
          text="Each room: $625-$675/mo"
          sub="Premium furnished room rentals"
        />
      </div>

      <div style={{ flex: 1 }} />

      <OrangeBar height={6} />
      <Watermark />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CARD 4 — WHY CO-LIVING WORKS
// ═══════════════════════════════════════════════════════════════════

function BulletPoint({ text, accent }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        marginBottom: 36,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: ORANGE,
          marginTop: 14,
          flexShrink: 0,
        }}
      />
      <div>
        <span
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: WHITE,
            lineHeight: 1.5,
          }}
        >
          {text}
        </span>
        {accent && (
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: ORANGE,
              lineHeight: 1.5,
            }}
          >
            {' '}
            {accent}
          </span>
        )}
      </div>
    </div>
  );
}

export function Card4_WhyCoLiving() {
  return (
    <div style={cardBase}>
      <VerticalAccent />
      <CardNumber num={4} />

      {/* Header */}
      <div style={{ padding: '60px 72px 0' }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ORANGE,
            marginBottom: 16,
          }}
        >
          Why This Works
        </div>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          4 Income Streams
          <br />
          <span style={{ color: GRAY, fontWeight: 400, fontSize: 36 }}>
            vs. 1 Traditional Tenant
          </span>
        </h2>
      </div>

      {/* Spacer */}
      <div style={{ flex: 0.5 }} />

      {/* Bullet points */}
      <div style={{ padding: '0 72px' }}>
        <BulletPoint
          text="Lose 1 tenant ="
          accent="75% income continues"
        />
        <BulletPoint
          text="Room rentals outperform whole-unit by"
          accent="40%+"
        />
        <BulletPoint
          text="Baltimore room demand is"
          accent="surging"
        />
        <BulletPoint
          text="Lower risk, higher returns,"
          accent="built-in redundancy"
        />
      </div>

      <div style={{ flex: 1 }} />

      <OrangeBar height={6} />
      <Watermark />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CARD 5 — THE PLAY (EXIT / CTA)
// ═══════════════════════════════════════════════════════════════════

export function Card5_ThePlay() {
  return (
    <div style={cardBase}>
      <VerticalAccent />
      <CardNumber num={5} />

      {/* Header */}
      <div style={{ padding: '60px 72px 0' }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ORANGE,
            marginBottom: 16,
          }}
        >
          The Exit Play
        </div>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          DSCR Refi
          <br />
          at Month 12
        </h2>
      </div>

      {/* Spacer */}
      <div style={{ flex: 0.4 }} />

      {/* Key metrics in cards */}
      <div style={{ padding: '0 72px' }}>
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {/* ARV card */}
          <div
            style={{
              flex: 1,
              padding: '32px 28px',
              backgroundColor: DARK_GRAY,
              borderRadius: 16,
              border: `1px solid ${WHITE}0D`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: GRAY,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              ARV
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: WHITE,
                letterSpacing: '-0.02em',
              }}
            >
              $180K
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 400,
                color: GRAY,
                marginTop: 4,
              }}
            >
              to $200K
            </div>
          </div>

          {/* Cash flow card */}
          <div
            style={{
              flex: 1,
              padding: '32px 28px',
              backgroundColor: `${ORANGE}1A`,
              borderRadius: 16,
              border: `1px solid ${ORANGE}33`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: ORANGE,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Net Cash Flow
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: ORANGE,
                letterSpacing: '-0.02em',
              }}
            >
              $1,280
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 400,
                color: `${ORANGE}AA`,
                marginTop: 4,
              }}
            >
              per month after refi
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <div
        style={{
          padding: '0 72px 28px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: WHITE,
            letterSpacing: '-0.01em',
            marginBottom: 20,
          }}
        >
          Own more, bank less.
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '18px 40px',
            backgroundColor: ORANGE,
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 700,
            color: WHITE,
            letterSpacing: '0.04em',
          }}
        >
          DM me for details
        </div>
      </div>

      <div style={{ height: 24 }} />
      <OrangeBar height={6} />
      <Watermark />
    </div>
  );
}

// ── Named exports array for viewer ────────────────────────────────
export const allCards = [
  { component: Card1_Hook, label: 'Hook' },
  { component: Card2_Numbers, label: 'The Numbers' },
  { component: Card3_Strategy, label: 'The Strategy' },
  { component: Card4_WhyCoLiving, label: 'Why Co-Living' },
  { component: Card5_ThePlay, label: 'The Play' },
];
