const InputBox = () => {
  return (
    <>
        <section id="input-box">
            <form action="/">
                <label htmlFor="todo">Task:</label>
                <br />
                <input type="text" name="todo" id="todo-text-input" placeholder="enter your task..."/>
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </section>
    </>
  );
}

export default InputBox;
