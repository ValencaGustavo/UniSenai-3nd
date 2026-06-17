import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  RadioTower,
  ShieldCheck,
  Truck,
} from "lucide-react";
import BrandMark from "../components/ui/BrandMark.jsx";
import Button from "../components/ui/Button.jsx";
import FastWordmark from "../components/ui/FastWordmark.jsx";
import TruckSilhouette from "../components/ui/TruckSilhouette.jsx";
import AuroraField from "../components/ui/AuroraField.jsx";

const FIXED_LOGIN = {
  email: "operacao@fastariam.com.br",
  password: "fastariam2026",
};

const LOGIN_HEADLINE = "Entre no cockpit logístico da Ariam.";

export { FIXED_LOGIN };

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(FIXED_LOGIN.email);
  const [password, setPassword] = useState(FIXED_LOGIN.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [entering, setEntering] = useState(false);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1750);
    return () => window.clearTimeout(timer);
  }, []);

  const completion = useMemo(() => {
    let value = 0;
    if (email.trim()) value += 48;
    if (password.trim()) value += 52;
    return value;
  }, [email, password]);

  function handleSubmit(event) {
    event.preventDefault();
    if (email.trim() !== FIXED_LOGIN.email || password !== FIXED_LOGIN.password) {
      setError("Credencial operacional não reconhecida.");
      return;
    }
    setError("");
    setEntering(true);
    window.setTimeout(() => {
      onLogin();
    }, 2850);
  }

  return (
    <main className="login-screen relative min-h-screen overflow-hidden text-zinc-950">
      <AuroraField variant="login" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(0,1fr)_500px]">
        <section className="relative hidden min-h-screen flex-col justify-between p-10 lg:flex">
          <div className="flex items-center gap-3">
            <BrandMark size={34} />
            <div>
              <p className="font-display text-[18px] font-semibold">
                Fast<span className="aurora-text">Ariam</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                cargo os · londrina/pr
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-[6px] border border-white/70 bg-white/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600 shadow-[0_14px_34px_-28px_rgb(15_23_42_/_0.8)] backdrop-blur-md">
              <span className="live-dot" />
              torre operacional ativa
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-[58px] font-semibold leading-[0.96] text-zinc-950">
              <AnimatedHeadline text={LOGIN_HEADLINE} />
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-600">
              Acesso centralizado para pedidos, PDFs operacionais, fretes, rotas e indicadores em tempo real.
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              <SignalCard icon={RadioTower} label="HQ LDB" value="online" />
              <SignalCard icon={ShieldCheck} label="SLA" value="97.4%" />
              <SignalCard icon={Truck} label="Frota" value="127" />
            </div>
          </div>

          <DeliveryTruckLane />

          <div className="relative z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">
            <span className="h-px w-12 bg-[color:var(--color-hazard)]" />
            sessão segura · 14 mai 2026 · brt
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-8">
          <form
            onSubmit={handleSubmit}
            className="auth-enter relative w-full max-w-[420px] overflow-hidden rounded-[4px] border border-zinc-200 bg-white p-5 shadow-[0_4px_16px_-4px_rgb(15_23_42_/_0.18)]"
          >
            <span aria-hidden className="aurora-hairline absolute inset-x-0 top-0 h-[3px]" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-hazard)]">
                  acesso operacional
                </p>
                <h2 className="mt-2 font-display text-[30px] font-semibold leading-none text-zinc-950">
                  Login FastAriam
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Acesso interno da central Ariam Comércio.
                </p>
              </div>
              <BrandMark size={36} />
            </div>

            <div className="mt-6 space-y-3">
              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold text-zinc-600">
                  E-mail
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 w-full rounded-[4px] border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.9)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  autoComplete="username"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-[11px] font-semibold text-zinc-600">
                  Senha
                </span>
                <div className="relative">
                  <LockKeyhole
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="h-11 w-full rounded-[4px] border border-zinc-200 bg-white pl-9 pr-10 text-sm font-medium text-zinc-950 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.9)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-[5px] text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </label>
            </div>

            {error && (
              <p className="mt-3 rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                {error}
              </p>
            )}

            <div className="mt-5 rounded-[4px] border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                <span>validação</span>
                <span className="tabular-nums text-zinc-800">{completion}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/60">
                <span
                  className="aurora-gradient block h-full rounded-full transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="aurora"
              size="lg"
              iconRight={ArrowRight}
              className="mt-5 w-full"
              disabled={entering}
            >
              {entering ? "Entrando..." : "Entrar no sistema"}
            </Button>

            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
              central londrina · acesso interno
            </p>
          </form>
        </section>
      </div>

      {booting && !entering && <EntryCinematic phase="boot" />}
      {entering && (
        <div className="entry-cinematic entry-cinematic--confirm fixed inset-0 z-50 grid place-items-center overflow-hidden text-white">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(31_79_143_/_0.34),transparent_22rem),radial-gradient(circle_at_52%_58%,rgb(215_40_47_/_0.20),transparent_20rem),linear-gradient(135deg,#020617_0%,#071426_46%,#020617_100%)]" />
          <div aria-hidden className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px), linear-gradient(0deg, rgb(255 255 255 / 0.10) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
          <span aria-hidden className="entry-cinematic__scanner absolute inset-x-0 top-0 h-px bg-[color:var(--color-hazard)]" />
          <div className="relative z-10 flex w-full max-w-[620px] flex-col items-center px-6 text-center">
            <div className="entry-cinematic__wordmark relative w-full max-w-[390px]">
              <FastWordmark className="h-auto w-full" />
            </div>
            <div className="entry-cinematic__f absolute top-1/2 w-[132px] -translate-y-1/2">
              <FastWordmark variant="f" className="h-auto w-full" />
            </div>
            <p className="entry-cinematic__copy mt-7 font-display text-[28px] font-semibold sm:text-[36px]">
              Acesso confirmado
            </p>
            <p className="entry-cinematic__copy mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/46">
              revelando o F da marca
            </p>
            <div className="entry-cinematic__progress mx-auto mt-7 h-1.5 w-72 overflow-hidden rounded-full bg-white/10">
              <span className="aurora-gradient block h-full rounded-full" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function EntryCinematic({ phase }) {
  const boot = phase === "boot";

  return (
    <div className="entry-cinematic fixed inset-0 z-50 grid place-items-center overflow-hidden text-white">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(31_79_143_/_0.34),transparent_22rem),radial-gradient(circle_at_52%_58%,rgb(215_40_47_/_0.18),transparent_20rem),linear-gradient(135deg,#020617_0%,#071426_46%,#020617_100%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px), linear-gradient(0deg, rgb(255 255 255 / 0.10) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <span aria-hidden className="entry-cinematic__scanner absolute inset-x-0 top-0 h-px bg-[color:var(--color-aurora-cyan)]" />

      <div className="relative z-10 flex w-full max-w-[620px] flex-col items-center px-6 text-center">
        <div className="entry-cinematic__wordmark relative w-full max-w-[390px]">
          <FastWordmark className="h-auto w-full" />
        </div>
        <div className="entry-cinematic__copy mt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/46">
            {boot ? "iniciando sessao segura" : "FastAriam"}
          </p>
          <p className="mt-2 font-display text-[28px] font-semibold leading-none sm:text-[36px]">
            FastAriam
          </p>
        </div>
        <div className="entry-cinematic__progress mt-7 h-1.5 w-full max-w-[330px] overflow-hidden rounded-full bg-white/10">
          <span className="block h-full rounded-full bg-[color:var(--color-hazard)]" />
        </div>
      </div>
    </div>
  );
}

function AnimatedHeadline({ text }) {
  let charIndex = 0;

  return (
    <span className="login-headline-kinetic" aria-label={text}>
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          className="login-headline-word"
          style={{ "--word": wordIndex }}
        >
          {[...word].map((char) => {
            const current = charIndex;
            charIndex += 1;

            return (
              <span
                key={`${char}-${current}`}
                className="login-headline-char"
                style={{ "--i": current }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function DeliveryTruckLane() {
  return (
    <div className="login-delivery-lane" aria-hidden="true">
      <div className="login-delivery-lane__track">
        <span className="login-delivery-lane__dash" />
        <span className="login-delivery-lane__dash login-delivery-lane__dash--mid" />
        <span className="login-delivery-lane__dash login-delivery-lane__dash--end" />
      </div>
      <div className="login-delivery-lane__destination">
        <span className="login-delivery-lane__pin" />
        <span>entrega confirmada</span>
      </div>
      <div className="login-delivery-lane__truck">
        <span className="login-delivery-lane__beam" />
        <TruckSilhouette
          width={92}
          height={43}
          color="#0d1929"
          opacity={1}
          className="drop-shadow-[0_16px_20px_rgb(15_23_42_/_0.16)]"
        />
        <span className="login-delivery-lane__label">LDB → CLIENTE</span>
      </div>
    </div>
  );
}

function SignalCard({ icon: Icon, label, value }) {
  return (
    <div className="premium-panel relative overflow-hidden rounded-[8px] p-4">
      <Icon size={17} strokeWidth={1.8} className="text-[color:var(--color-brand)]" />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 font-display-cond text-[28px] leading-none text-zinc-950">
        {value}
      </p>
    </div>
  );
}
