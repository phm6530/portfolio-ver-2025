import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/browser";
// 모든 테스트를 실행하기 전에 모의 테스트를 활성화합니다 ( server.listen());
// 테스트 사이에 모든 요청 핸들러를 재설정합니다 ( server.resetHandlers());
// 모든 테스트가 실행된 후 기본 요청 발행 모듈을 복원합니다 ( server.close()).
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
