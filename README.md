<div align="center">
    <img src="https://github.com/argon1025/muzi-backend/assets/55491354/4b92e8d2-6d67-42ba-be54-ec82af8ec14a" alt="Logo">
  <h3 align="center">Muzi Front-end</h3>

  <p align="center">
    무지 프론트 서비스<br />
    서로 다른 서비스의 맛집, 제품 체험단 공고 통합 조회 제공
    <br />
    <br />
    <a href="https://mu-zi.net">Go to Service</a>
    ·
    <a href="https://backend.mu-zi.net/api">View Swagger Doc</a>
    ·
    <a href="https://github.com/argon1025/muzi-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/argon1025/muzi-frontend/issues">Request Feature</a>
  </p>
</div>

# Introduce
![image](https://github.com/argon1025/muzi-frontend/assets/55491354/8e30eb40-dcac-4b02-bd0f-51ccfbe86f85)

## Built With

- React (TypeScript)
- Tailwind

## Convention

이슈 관리

- `Github Projects`로 이슈를 생성 및 트래킹 합니다. [링크](https://github.com/users/argon1025/projects/3/views/1)

브랜치 정책

- 브랜치를 병합하기 위해서는 반드시 PR을 생성하고 테스트가 통과되어야 합니다.
  - PR 생성 시 [테스트 자동화 액션](https://github.com/argon1025/muzi-backend/actions/workflows/pull-request-test.yaml)이 자동으로 수행됩니다.
- 각 이슈별로 브랜치를 분리합니다.
  - 브랜치 명칭은 `{feature|fix}-#{이슈 번호}` 로 생성합니다. ex) `feature-#19`
- `Main` `Develop` 브랜치는 리니어 하게 관리합니다.
  - 핫픽스를 병합할 경우 이력전체를 저장하기 위해 `Merge` 합니다.
  - 개발 브랜치를 병합할 경우 `Squash` 합니다.
  - Main, Develop 간에는 `Fast forward`를 합니다.
- conventionalCommits을 준수합니다


# How To Start

## 패키지 설치
```
npm i
```
> 기본 패키지 매니저의 경우 `npm`을 사용하고 있습니다.

## 프로젝트 시작
```
npm start
```
