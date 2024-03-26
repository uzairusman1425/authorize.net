"use client";
function Input(props) {
  return (
    <>
      <div className="input1 ml-4 ">
        <p className="text-xl font-semibold  mb-2">{props.detail}</p>
        <input
          type={props.type}
          name={props.name}
          value={props.state}
          id={props.id}
          className="border-2 px-2  border-black bg-transparent rounded-md w-[300px] h-[40px]"
          placeholder={props.placeholder}
          onChange={(e) => props.setstate(e.target.value)}
        />
      </div>
    </>
  );
}

export default Input;
