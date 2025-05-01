import styled, { css, keyframes } from "styled-components";
const onPopup = keyframes`
    from{
        opacity: 0;
        transform: translateY(50px);
    }
    to{
        opacity: 1;
        transform: translateY(0px);
    }
`;

const offPopup = keyframes`
    from{
        opacity: 1;
        transform: translateY(0px);
    }
    to{
        opacity: 0;
        transform: translateY(-50px);
    }
`;

const PopupStyle = styled.div``;

const PopupWrap = styled.div<{ $close: boolean }>`
  padding: 20px;
  border-radius: 1em;
  background: var(--color-popup-background);
  animation: ${onPopup} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  ${({ $close }) => {
    if ($close) {
      return css`
        animation: ${offPopup} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
          forwards;
      `;
    }
  }}

  box-shadow: 15px 55px 55px rgba(0, 0, 0, 0.9);
  border: 1px solid var(--borer-line-color);
`;

export { PopupWrap, PopupStyle };
