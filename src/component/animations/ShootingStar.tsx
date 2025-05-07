import { useEffect } from "react";
import styled from "styled-components";

const AnimationSection = styled.section`
  overflow: hidden;

  @keyframes animate {
    0% {
      transform: rotate(45deg) translateX(0);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(45deg) translateX(1000px);
      opacity: 0;
    }
  }
  @keyframes Light {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  span {
    position: absolute;
    bottom: 0%;
    left: 0%;
    z-index: 0;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.1),
      0 0 0 8px rgba(255, 255, 255, 0.1),
      0 0 20px rgba(255, 255, 255, 0.1);
    animation:
      animate 0.5s linear infinite,
      Light 1s ease-in-out infinite;
  }

  span::before {
    content: "";
    position: absolute;
    top: 50%;
    /* 위치 조정 */
    right: 0;
    left: auto;
    transform: translateY(-50%);
    width: 300px;
    height: 1px;
    /* 그라디언트 방향 변경 */
    background: linear-gradient(90deg, transparent, #ffffffa4);
  }

  .span-1 {
    top: 0;
    left: 50px;
  }

  .span-2 {
    top: -20px;
    left: 180px;
  }

  .span-3 {
    top: 80px;
    left: 30px;
  }
`;

const ShootingStar = (): JSX.Element => {
  useEffect(() => {
    const spans = document.querySelectorAll("span");

    spans.forEach((span) => {
      const delay = Math.random() * 2;
      const duration = 1 + Math.random() * 2;

      span.style.animationDelay = `${delay}s`;
      span.style.animationDuration = `${duration}s`;
    });
  }, []);

  return (
    <div className="w-2/3 h-screen relative">
      <AnimationSection>
        <span className="span-1"></span>
        <span className="span-2"></span>
        <span className="span-3"></span>
      </AnimationSection>
    </div>
  );
};

export default ShootingStar;
