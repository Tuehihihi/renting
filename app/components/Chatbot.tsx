import { BsTextParagraph } from 'react-icons/bs';

const Chatbot = () => {
  return (
    <div 
      className="fixed bottom-5 right-4 rounded-t-2xl rounded-bl-2xl bg-green-500 flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer"
    >
      <BsTextParagraph size={25} color=''/>
    </div>
  );
};

export default Chatbot;
