"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, X, RotateCcw } from "lucide-react";
import { QUIZ } from "@/lib/content";
import { Card } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";

export default function Quiz() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const done = i >= QUIZ.length;

  const choose = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === QUIZ[i].a) setScore((s) => s + 1);
  };
  const next = () => {
    setPicked(null);
    setI((n) => n + 1);
  };
  const reset = () => {
    setI(0);
    setPicked(null);
    setScore(0);
  };

  if (done) {
    return (
      <Card className="p-8 text-center">
        <p className="eyebrow">Result</p>
        <p className="mt-3 font-display text-5xl font-semibold text-white">{score}/{QUIZ.length}</p>
        <p className="mt-3 text-fg-muted">
          {score === QUIZ.length ? "Perfect. You should be running the next session." : score >= QUIZ.length / 2 ? "Solid. A couple of observing nights and you'll ace it." : "Great start — the learning tracks above cover all of these."}
        </p>
        <Button onClick={reset} variant="secondary" className="mt-6"><RotateCcw className="h-4 w-4" /> Try again</Button>
      </Card>
    );
  }

  const q = QUIZ[i];
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs text-fg-subtle">
        <span>Question {i + 1} of {QUIZ.length}</span>
        <span>Score {score}</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full bg-star-500 transition-all" style={{ width: `${(i / QUIZ.length) * 100}%` }} />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{q.q}</h3>
      <div className="mt-5 grid gap-2">
        {q.options.map((opt, idx) => {
          const isRight = idx === q.a;
          const state = picked === null ? "idle" : isRight ? "right" : idx === picked ? "wrong" : "dim";
          return (
            <button
              key={opt}
              onClick={() => choose(idx)}
              disabled={picked !== null}
              className={clsx(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ring-focus",
                state === "idle" && "border-line hover:border-line-strong hover:bg-white/5",
                state === "right" && "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
                state === "wrong" && "border-red-500/50 bg-red-500/10 text-red-200",
                state === "dim" && "border-line opacity-50"
              )}
            >
              {opt}
              {state === "right" && <Check className="h-4 w-4" />}
              {state === "wrong" && <X className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-5 flex justify-end">
          <Button onClick={next} size="sm">{i + 1 === QUIZ.length ? "See result" : "Next"}</Button>
        </div>
      )}
    </Card>
  );
}
