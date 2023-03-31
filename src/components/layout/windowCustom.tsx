import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

/**
 * 일단 mousedown 이벤트에서 잡은 startX를 업데이트해주지 않으니까 dx dy가 너무 커질거같아요
 *
 * 첫 지점을 계속 잡지 않고, move이벤트 발생할 때, 현재 위치랑 이전 이벤트 발생지점의 차이를 옮겨주는 방식으로 예를 들어) 1만큼 계속 움직이면, 계속 +1 +1 +1… 해주면 되겠죠
 * 이전 위치를 기억해야겠죠
 *
 * https://velog.io/@sugar_ghost/javascript%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-mouse%EB%A1%9C-html-%EC%9A%94%EC%86%8C-drag%ED%95%98%EA%B8%B0%EC%BD%94%EB%93%9C-%EC%A0%80%EC%9E%A5%EC%9A%A9
 */

interface WindowProps {
  children: React.ReactNode;
}

export default function WindowCustom({ children }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(300);

  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 100,
    top: 100,
  });

  // drag 로직
  useEffect(() => {
    if (!windowRef.current) return;

    const downEvent = (e: MouseEvent) => {
      // 클릭 시작
      const isHeadClick = document
        .elementsFromPoint(e.clientX, e.clientY)
        .includes(headRef.current!!);

      if (isHeadClick == false) return;

      e.preventDefault();

      let startX = e.clientX;
      let startY = e.clientY;

      // 드래그 시작
      const move = (event: MouseEvent) => {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        startX = e.clientX;
        startY = e.clientY;

        setPosition({ left: position.left + dx, top: position.top + dy });
      };

      // 드래그 종료
      const up = (e: MouseEvent) => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    };

    windowRef.current.addEventListener("mousedown", downEvent);

    return () => {
      windowRef.current?.removeEventListener("mousedown", downEvent);
    };
  }, [windowRef]);

  // resize 로직
  useEffect(() => {
    windowRef.current?.addEventListener("mouseover", (e) => {
      console.log("over!");
      const listOnPoint = document.elementsFromPoint(e.clientX, e.clientY);
      //   if (!headRef.current || !bodyRef.current) return;

      //   if (
      //     !listOnPoint.includes(headRef.current) &&
      //     !listOnPoint.includes(bodyRef.current)
      //   ) {
      //     (e.target as HTMLElement).classList.add("resize");
      //   } else {
      //     (e.target as HTMLElement).classList.remove("resize");
      //   }
    });
  }, []);

  const { left, top } = position;
  const spec = { left, top, width, height };

  return (
    <div.wrap {...spec} ref={windowRef}>
      <div.resize>
        <div.head ref={headRef}>head</div.head>

        <div.body ref={bodyRef}>
          <div>
            <div>left : {left}</div>
            <div>top : {left}</div>
          </div>
          {children}
        </div.body>
      </div.resize>
    </div.wrap>
  );
}

const div = {
  wrap: styled.div<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>`
    position: fixed;

    left: ${(p) => p.left}px;
    top: ${(p) => p.top}px;
    width: ${(p) => p.width}px;
    height: ${(p) => p.height}px;
    padding: 10px;

    border: 1px #000 solid;
  `,

  resize: styled.div`
    height: 100%;
  `,

  head: styled.div`
    background-color: #b9b9b9;
    height: 25px;
    cursor: move;
  `,
  body: styled.div`
    background-color: #eee;
    height: calc(100% - 25px);
  `,
};
