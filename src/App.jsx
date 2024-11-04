import { useEffect, useCallback, useState, useRef } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setlength] = useState(12);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const passwordRef = useRef(null)
  let pass= "";

  // main function
  const passwordGenerator = useCallback(() => {
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if(number) str += "0123456789";
    if(specialCharacter) str += "!@#$%^&*()_+=-{}[]|:;<>,.?/~`"
    for(let i=0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    } 
    setPassword(pass);
  }, [length, number, specialCharacter]);

  const copyToClipboard = () => {
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, length)
    navigator.clipboard.writeText(password);
  }

  // useEffect hook to generate password on component mount
  useEffect(passwordGenerator, 
    [length, number, specialCharacter]
  )
  return (
    <div className="w-screen min-h-screen p-5 flex items-center justify-center">
        <div className="bg-[rgb(10,64,123)] bg-[linear-gradient(45deg,_rgba(10,64,123,1)_0%,_rgba(23,72,81,1)_50%,_rgba(10,64,123,1)_100%)] px-10 py-8 mx-auto rounded-xl">
          <h1 className="text-center uppercase text-4xl font-extrabold">password generator</h1>
          <div className="mt-7 flex items-center">
            <input 
              type="text"
              value={password}
              className="bg-white w-[560px] rounded-l-md h-[50px] px-5 text-slate-800 text-lg font-medium outline-none border-none"  
              readOnly
              ref={passwordRef}
            />
            <button 
              className="text-lg h-[50px] px-8 rounded-none rounded-r-md border-none outline-none focus:outline-none"
              onClick={copyToClipboard}
            >Copy</button>
          </div>
          <div className="flex items-center justify-start gap-5 mt-7">
            <div className="flex items-center justify-start gap-3">
              <input 
                type="range" 
                min={8}
                max={42}
                defaultValue={12}
                onChange={(e) => {setlength(e.target.value)}}
              />
              <label>Length {length}</label>
            </div>
            <div className="flex items-center justify-start gap-2">
              <input 
                type="checkbox" 
                defaultValue={false}
                onChange={() => {setNumber(prev => !prev)}}
              />
              <label>Number</label>
            </div>
            <div className="flex items-center justify-start gap-2">
              <input 
                type="checkbox" 
                defaultValue={false}
                onChange={() => {setSpecialCharacter(prev => !prev)}}
              />
              <label>Special character</label>
            </div>
          </div>
        </div>
    </div>
  )
}