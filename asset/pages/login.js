const logIn = () => {
  return `
  <div class="flex items-center justify-center max-w-full h-screen">
      <div
        class="w-96 rounded-md shadow-lg px-4 py-8 backdrop-blur-xl bg-pink-800"
      >
        <h1
          class="font-bold text-2xl flex justify-center items-center text-white"
        >
          Log in
        </h1>
        <div class="flex-col mb-4">
          <label class="text-white">Username</label>
          <input
            placeholder="uername"
            required
            id="uername"
            class="w-full outline-none border-none rounded-md px-2 py-3 mt-2"
            type="text"
          />
        </div>
        <div class="flex-col mb-4">
          <label class="text-white">Password</label>
          <input
            id="password"
            placeholder="password"
            required
            class="w-full outline-none border-none rounded-md px-2 py-3 mt-2"
            type="password"
          />
        </div>
        <div class="my-4 mt-12">
          <button
            data-link
            type="submit"
            id="btn-submit__login"
            class="text-pink-900 text-xl bg-pink-300 w-full rounded-md px-2 py-3"
          >
            Submit
          </button>
        </div>
        <div class="text-center mb-4">
          <a class="text-lg text-blue-200" href="/public">sign up</a>
        </div>
        <div class="text-center">
          <a data-link class="text-blue-200" href="forget-password"
            >forget password ?</a
          >
        </div>
      </div>
    </div>
    `;
};
export default logIn;
