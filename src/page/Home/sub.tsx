<main className="min-h-screen bg-black text-white p-6 md:p-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
    {/* 왼쪽 자기소개 섹션 */}
    <div className="md:col-span-4 md:sticky md:top-10 self-start py-10 pr-10">
      <h1 className="text-3xl md:text-4xl font-light mb-4">
        안녕하세요, 저는
        <br />
        <span className="font-normal">Phm 입니다.</span>
      </h1>

      <p className="text-gray-400 text-sm leading-relaxed mt-6 mb-6">
        전문성 있는 프론트엔드 개발자로 성장하고자 합니다. 트랜디 한 기술을
        파악하고, 익숙해지는 것에 전념하고 있습니다.
      </p>

      <div className="text-gray-500 text-xs mt-8">
        <a
          href="mailto:example@email.com"
          className="block mb-1 hover:text-white transition-colors"
        >
          example@email.com
        </a>
        <a
          href="https://github.com/phm6530"
          className="block mb-1 hover:text-white transition-colors"
        >
          github.com/phm6530
        </a>
      </div>

      <nav className="mt-16">
        <ul className="space-y-3">
          <li>
            <a
              href="#projects"
              className="text-xs uppercase tracking-wider flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <span className="w-4 h-px bg-gray-700 mr-2"></span>
              Projects
            </a>
          </li>
          <li>
            <a
              href="#posts"
              className="text-xs uppercase tracking-wider flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <span className="w-4 h-px bg-gray-700 mr-2"></span>
              Posts
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-xs uppercase tracking-wider flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <span className="w-4 h-px bg-gray-700 mr-2"></span>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="mt-16 flex space-x-4">
        <a
          href="#"
          className="text-gray-600 hover:text-white transition-colors"
        >
          <Kakao className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/phm6530/"
          className="text-gray-600 hover:text-white transition-colors"
        >
          <GitSvg className="w-5 h-5" />
        </a>
        <a
          href="https://blog.h-creations.com/"
          className="text-gray-600 hover:text-white transition-colors"
        >
          <BlogSvg className="w-5 h-5" />
        </a>
      </div>
    </div>

    {/* 오른쪽 프로젝트 그리드 섹션 */}
    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Featured 프로젝트 */}
      <div className="col-span-1 md:col-span-2 mb-10">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          Featured
        </div>
        <h2 className="text-lg mb-1">Portfolio.js</h2>
        <p className="text-xs text-gray-400 mb-1">
          A 개인 포트폴리오 사이트, 현재 보고 계신 이 웹사이트입니다.
        </p>
        <div className="text-xs text-gray-500">React • Next.js</div>
      </div>

      {/* Featured 두번째 프로젝트 */}
      <div className="col-span-1 md:col-span-2 mb-10">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          Featured
        </div>
        <h2 className="text-lg mb-1">Browserroute.js</h2>
        <p className="text-xs text-gray-400 mb-1">
          A 페이지간 라우팅 시스템과 history 관리 기능을 구현했습니다.
        </p>
        <div className="text-xs text-gray-500">JavaScript • SPA</div>
      </div>

      {/* 최근 포스트 헤더 */}
      <div className="col-span-1 md:col-span-2 my-6" id="posts">
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          Recent Posts
        </div>
      </div>

      {/* 포스트 카드들 */}
      <div className="bg-zinc-900 p-5 hover:bg-zinc-800 transition-colors">
        <div className="text-xs text-gray-400 mb-1">Apr 10, 2025</div>
        <h3 className="text-md font-normal mb-6">
          Soft Navigation & Hard Navigation
        </h3>
        <div className="text-xs text-gray-500">React</div>
      </div>

      <div className="bg-zinc-900 p-5 hover:bg-zinc-800 transition-colors">
        <div className="text-xs text-gray-400 mb-1">Apr 23, 2025</div>
        <h3 className="text-md font-normal mb-6">CMS Blog (1)</h3>
        <div className="text-xs text-gray-500">React</div>
      </div>

      {/* 다른 프로젝트 헤더 */}
      <div className="col-span-1 md:col-span-2 my-6" id="projects">
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          Other Projects
        </div>
      </div>

      {/* 다른 프로젝트 카드들 */}
      <div className="bg-zinc-900 p-5 hover:bg-zinc-800 transition-colors">
        <h3 className="text-md font-normal mb-2">
          Test-Driven Development with Vue.js
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Vue.js의 테스트 주도 개발 방법론에 대한 연구입니다.
        </p>
        <div className="text-xs text-gray-500">Vue • Jest</div>
      </div>

      <div className="bg-zinc-900 p-5 hover:bg-zinc-800 transition-colors">
        <h3 className="text-md font-normal mb-2">
          In Defense of Utility-First CSS
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          유틸리티 퍼스트 CSS의 장점과 사용법에 대한 연구입니다.
        </p>
        <div className="text-xs text-gray-500">CSS • Tailwind</div>
      </div>

      <div className="bg-zinc-900 p-5 hover:bg-zinc-800 transition-colors">
        <h3 className="text-md font-normal mb-2">
          An Introduction to TDD and Vue.js
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Vue.js에서 TDD를 시작하는 방법에 대한 소개입니다.
        </p>
        <div className="text-xs text-gray-500">Vue • Testing</div>
      </div>

      <div className="bg-zinc-900 p-5 hover:bg-zinc-800 transition-colors">
        <h3 className="text-md font-normal mb-2">
          Scaling With(out) Middleware
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          미들웨어를 사용하거나 사용하지 않는 확장 방법에 관한 연구입니다.
        </p>
        <div className="text-xs text-gray-500">Node.js • Express</div>
      </div>
    </div>
  </div>
</main>;
