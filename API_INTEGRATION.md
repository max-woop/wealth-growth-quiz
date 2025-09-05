# Интеграция с внешними API

## FXClub API (Русский язык)

**URL**: https://lib.fxclub.org/landing/js/landing-api.min.2.8.0.js
**API Key**: `d24c74c0d020796a1f7c81c1d0689b00bad73716`
**Компонент**: `RussianRegistrationStep.tsx`

### Как работает:
1. Загружается скрипт FXClub API
2. Инициализируется форма с ID `#email-form`
3. При успешной регистрации вызывается `registrationCallback`
4. Отправляются данные в utag для аналитики
5. Вызывается `onNext()` для перехода к следующему шагу

### Поля формы:
- `email` - email пользователя
- `password` - пароль
- `phone` - телефон
- `fxc-captcha-container` - контейнер для капчи

## Libertex API (Испанский язык)

**URL**: https://lib.libertex.org/landing/js/landing-api.min.2.8.0.js
**API Key**: `0f0db22798ae5405f30e5c1233bb3152863102af`
**Компонент**: `SpanishRegistrationStep.tsx`

### Как работает:
1. Загружается скрипт Libertex API
2. Инициализируется форма с ID `#email-form`
3. При успешной регистрации вызывается `registrationCallback`
4. Отправляются данные в utag для аналитики
5. Добавляется класс `loading` к body
6. Вызывается `onNext()` для перехода к следующему шагу

### Поля формы:
- `email` - email пользователя
- `password` - пароль
- `phone` - телефон
- `ll-captcha-container` - контейнер для капчи

## Английский язык

**Компонент**: `LeadCaptureStep.tsx` (встроенная форма)
**Обработка**: Локальная обработка без внешних API

### Поля формы:
- `name` - имя пользователя
- `email` - email пользователя

## Отладка

### Проверка загрузки скриптов:
```javascript
// FXClub API
console.log('FXClub loaded:', typeof window.fxcLanding);

// Libertex API
console.log('Libertex loaded:', typeof window.llLanding);
```

### Проверка utag:
```javascript
console.log('utag available:', typeof window.utag);
```

## Возможные проблемы:

1. **CORS ошибки** - при разработке на localhost
2. **Блокировка скриптов** - адблокеры или настройки браузера
3. **Недоступность API** - проблемы с серверами FXClub/Libertex
4. **Неверные API ключи** - проверьте актуальность ключей
