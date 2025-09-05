# Стилизация сообщений об ошибках в формах

## Добавленные CSS классы

### Основные стили ошибок
```css
.form-error {
  font-size: 12px;
  color: #dc2626; /* red-600 */
  margin-top: 4px;
  display: block;
  line-height: 1.2;
}
```

### Стили для полей с ошибками
```css
.input-error {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px #dc2626 !important;
}
```

### Стили для сообщений об ошибках интеграции
```css
.integration-error {
  font-size: 12px;
  color: #dc2626;
  text-align: center;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  line-height: 1.3;
}
```

## Компоненты

### FormError
Переиспользуемый компонент для отображения сообщений об ошибках:

```tsx
<FormError 
  message="Текст ошибки" 
  type="error" // 'error' | 'warning' | 'success'
  showIcon={true}
/>
```

### FormField
Компонент-обертка для полей формы с поддержкой ошибок:

```tsx
<FormField error="Текст ошибки">
  <input ... />
</FormField>
```

## Использование

### В LeadCaptureStep (английская форма)
- Добавлена валидация полей name и email
- Ошибки отображаются под полями с красной рамкой
- Используются компоненты FormField и FormError

### В SpanishRegistrationStep
- Сообщение об ошибке интеграции стилизовано с иконкой предупреждения
- Использует класс `.integration-error`

## Типы сообщений

1. **Ошибки** (error) - красный цвет, иконка ❌
2. **Предупреждения** (warning) - оранжевый цвет, иконка ⚠️  
3. **Успех** (success) - зеленый цвет, иконка ✅

## Примеры использования

### Простое сообщение об ошибке
```tsx
<FormError message="Поле обязательно для заполнения" />
```

### Поле с ошибкой
```tsx
<FormField error="Неверный email адрес">
  <input 
    className={`input-field ${error ? 'input-error' : ''}`}
    type="email"
  />
</FormField>
```

### Сообщение об ошибке интеграции
```tsx
<div className="integration-error">
  <span className="form-error-icon">⚠️</span>
  Ошибка подключения к сервису
</div>
```
