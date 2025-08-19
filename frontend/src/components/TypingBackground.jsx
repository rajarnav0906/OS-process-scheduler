import { useEffect, useState, useRef } from "react";

const philosopherCode = [
  "class Semaphore{",
  "private:",
  "    mutex mtx;",
  "    condition_variable cv;",
  "    int count;",
  "",
  "public:",
  "    Semaphore () {}",
  "    Semaphore(int c) : count(c) {}",
  "",
  "    void setCount(int a){",
  "        count = a;",
  "    }",
  "",
  "    inline void signal(){",
  "        unique_lock<mutex> lock(mtx);",
  "        count++;",
  "        if(count <= 0){",
  "            cv.notify_one();",
  "        }",
  "    }",
  "",
  "    inline void wait(){",
  "        unique_lock<mutex> lock(mtx);",
  "        count--;",
  "        while(count < 0){",
  "            cv.wait(lock);",
  "        }",
  "    }",
  "};",
  "",
  "class DiningPhilosophers {",
  "    Semaphore fork[5];",
  "    mutex m;",
  "public:",
  "    DiningPhilosophers() {",
  "        for(int i = 0; i < 5; i++){",
  "            fork[i].setCount(1);",
  "        }",
  "    }",
  "",
  "    void wantsToEat(int philosopher,",
  "                    function<void()> pickLeftFork,",
  "                    function<void()> pickRightFork,",
  "                    function<void()> eat,",
  "                    function<void()> putLeftFork,",
  "                    function<void()> putRightFork)",
  "    {",
  "        {",
  "            lock_guard<mutex> lock(m);",
  "            fork[(philosopher + 1) % 5].wait();",
  "            fork[philosopher].wait();",
  "        }",
  "",
  "        pickLeftFork();",
  "        pickRightFork();",
  "",
  "        eat();",
  "",
  "        putLeftFork();",
  "        fork[(philosopher + 1) % 5].signal();",
  "        putRightFork();",
  "        fork[philosopher].signal();",
  "    }",
  "};",
];

// simple highlighting
function highlightCode(line) {
  const keywords = ["class","private","public","int","void","inline","while","for","if","else","return"];
  const colors = {
    keyword: "text-purple-400",
    type: "text-blue-400",
    function: "text-green-400",
    number: "text-amber-300",
  };

  if (!line) return null;
  if (line.trim().startsWith("//")) return <span className="text-gray-500 italic">{line}</span>;
  if (line.trim().startsWith("#")) return <span className="text-pink-400">{line}</span>;

  return line.split(/(\s+|\(|\)|;|,)/g).map((word, i) => {
    if (keywords.includes(word)) return <span key={i} className={colors.keyword}>{word}</span>;
    if (/^[0-9]+$/.test(word)) return <span key={i} className={colors.number}>{word}</span>;
    if (word.endsWith("(") || word.endsWith(")")) return <span key={i} className={colors.function}>{word}</span>;
    if (["mutex","condition_variable","Semaphore"].includes(word)) return <span key={i} className={colors.type}>{word}</span>;
    return <span key={i}>{word}</span>;
  });
}

export default function TypingBackground() {
  const [displayed, setDisplayed] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef(null);

  // blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  const reset = () => {
    setDisplayed([]);
    setLineIndex(0);
    setCharIndex(0);
  };

  // smooth auto-scroll
  const smoothScrollToBottom = () => {
    if (!containerRef.current) return;
    const target = containerRef.current.scrollHeight;
    const start = containerRef.current.scrollTop;
    const distance = target - start;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 300, 1);
      containerRef.current.scrollTop = start + distance * progress;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  };

  // typing effect
  useEffect(() => {
    let timeout;
    if (lineIndex < philosopherCode.length) {
      const line = philosopherCode[lineIndex];
      if (charIndex < line.length) {
        timeout = setTimeout(() => {
          setDisplayed((prev) => {
            const copy = [...prev];
            copy[lineIndex] = (copy[lineIndex] || "") + line[charIndex];
            return copy;
          });
          setCharIndex((prev) => prev + 1);
          smoothScrollToBottom();
        }, 25);
      } else {
        timeout = setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 150);
      }
    } else {
      timeout = setTimeout(() => reset(), 3000);
    }
    return () => clearTimeout(timeout);
  }, [lineIndex, charIndex]);

  return (
    <div className="bg-[#0D1117] border border-gray-700 rounded-lg shadow-lg w-full h-full flex flex-col overflow-hidden relative">
      {/* Editor Header */}
      <div className="relative flex items-center gap-2 p-2 border-b border-gray-700">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="ml-3 text-gray-400 text-xs font-mono">main.cpp</span>
      </div>

      {/* Fixed typing area with scroll inside */}
      <div
        ref={containerRef}
        className="
          flex-1 p-4
          overflow-y-hidden
        "
      >
        <pre className="text-sm font-mono leading-relaxed text-gray-200">
          {displayed.map((line, idx) => (
            <div key={idx} className="flex">
              <span className="w-10 text-right pr-3 text-gray-600 select-none">
                {idx + 1}
              </span>
              <span>
                {highlightCode(line)}
                {idx === displayed.length - 1 &&
                  charIndex < philosopherCode[lineIndex]?.length &&
                  cursorVisible && <span className="text-white">|</span>}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );

}
