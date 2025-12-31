import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { MessageSlide } from "../components/MessageSlide";
import { reflectionMessages, shuffleMessages } from "../data/messages";
import { useFlow } from "../context/FlowContext";

export function Moment() {
  const navigate = useNavigate();
  const { completeMoment } = useFlow();

  const shuffledMessages = useMemo(() => {
    return shuffleMessages(reflectionMessages);
  }, []);

  const handleMessagesComplete = () => {
    completeMoment();
    navigate("/welcome");
  };

  return (
    <MessageSlide
      messages={shuffledMessages}
      onComplete={handleMessagesComplete}
    />
  );
}
