import { Button } from "@/components/ui/button";
import styled from "styled-components";

const ConfirmStyle = styled.div`
  text-align: center;
  p {
    font-weight: bold;
    font-size: 1rem;
    padding: 20px 0;
    span {
      color: rgba(114, 100, 239, 1);
    }
  }
`;

interface ConfirmProps {
  message: string;
  confirm: () => void;
}

export default function Confirm({ message, confirm }: ConfirmProps) {
  return (
    <ConfirmStyle>
      <p>
        [<span>{message}</span>]을/를 삭제하시겠습니까?
      </p>
      <Button onClick={confirm}>YES</Button>
    </ConfirmStyle>
  );
}
