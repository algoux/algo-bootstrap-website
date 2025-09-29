# 客户端平台检测迁移指南

## 概述

新的客户端平台检测方案 (`platform-client-only.util.ts`) 提供了与原有 `platform.util.ts` 完全兼容的 API，同时增加了更好的错误处理和缓存机制。

## 迁移步骤

### 1. 替换导入

**原有代码:**
```typescript
import platformUtil from '@client/utils/platform.util';
```

**新代码:**
```typescript
import platformUtil from '@client/utils/platform-client-only.util';
```

### 2. API 保持不变

所有现有的 API 调用都保持不变：

```typescript
// 这些调用无需修改
const info = platformUtil.getPlatformInfo();
const os = platformUtil.getOperatingSystem();
const arch = platformUtil.getArchitecture();
const isMac = platformUtil.isMac();
const isWindows = platformUtil.isWindows();
const isX64 = platformUtil.isX64();
const isARM64 = platformUtil.isARM64();
```

### 3. 针对具体组件的建议

#### A. download-button.vue
当前组件已经通过 props 接收平台信息，无需修改。
如果需要内部检测，可以参考示例 3。

#### B. release-item.vue  
将导入改为新的工具：
```typescript
import platformUtil from '@client/utils/platform-client-only.util';
```

#### C. home.view.vue (如果有)
推荐使用 `usePlatform()` Hook：
```typescript
import { usePlatform } from '@client/utils/platform-hooks';
const { os, architecture } = usePlatform();
```

## 新增功能

### 1. Vue Composable
```typescript
import { usePlatform } from '@client/utils/platform-hooks';

const { 
  os, 
  architecture, 
  isMac, 
  isWindows, 
  isDetected 
} = usePlatform();
```

### 2. 缓存重置
```typescript
// 如果需要强制重新检测
platformUtil.resetPlatformCache();
```

### 3. 立即检测
```typescript
import { detectPlatform } from '@client/utils/platform-hooks';

// 同步获取平台信息（不需要响应式）
const info = detectPlatform();
```

## 优势

1. **更好的错误处理**: 在检测失败时有合理的 fallback
2. **性能优化**: 内置缓存机制，避免重复检测
3. **调试友好**: 添加了调试日志
4. **完全兼容**: 与现有代码 100% 兼容
5. **更准确的检测**: 特别是 Apple Silicon Mac 的检测

## 实际修改建议

由于您的组件已经设计得很好（通过 props 传递平台信息），您只需要：

1. **修改导入语句** (在需要检测平台的地方)
2. **在父组件中使用新的检测工具** (如 home.view.vue)
3. **保持子组件不变** (download-button.vue 等)

这样既保持了组件的灵活性，又获得了更好的检测准确性。
