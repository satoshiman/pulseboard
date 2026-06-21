# Notification Store — `src/store/notification.store.ts`

Zustand store quản lý toàn bộ trạng thái notification của app.

---

## State (`NotificationState`)

- **`notifications`** — mảng tất cả notification
- **`unreadCount`** — đếm số notification chưa đọc (cache riêng, không tính lại từ mảng mỗi lần render)
- **`filter`** — bộ lọc hiện tại: `'all'` hoặc `'unread'`

---

## Actions

### `addNotification(n)`

Thêm notification mới vào store.

```ts
addNotification: (n) =>
  set((state) => ({
    notifications: [n, ...state.notifications],
    unreadCount: state.unreadCount + (n.read ? 0 : 1),
  })),
```

- Prepend `n` lên đầu mảng (mới nhất ở trên cùng)
- Tăng `unreadCount` **chỉ khi** `n.read === false`

---

### `markAsRead(id)`

Đánh dấu một notification là đã đọc theo `id`.

```ts
markAsRead: (id) =>
  set((state) => {
    const target = state.notifications.find((n) => n.id === id);
    if (!target || target.read) return state;
    return {
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    };
  }),
```

- **Guard**: nếu không tìm thấy hoặc đã đọc rồi → trả về `state` cũ (tránh re-render thừa)
- Set `read: true` cho đúng item theo `id`
- Giảm `unreadCount` đi 1, dùng `Math.max(0, ...)` để tránh số âm

---

### `setFilter(f)`

Đổi bộ lọc hiển thị.

```ts
setFilter: (filter) => set({ filter }),
```

---

## Selector hooks

```ts
export const useNotifications = () =>
  useNotificationStore((s) => s.notifications);
export const useUnreadCount = () => useNotificationStore((s) => s.unreadCount);
export const useNotificationFilter = () =>
  useNotificationStore((s) => s.filter);
```

Mỗi hook subscribe **một phần nhỏ** của store → component chỉ re-render khi đúng phần đó thay đổi (tối ưu hiệu năng).

---

## Điểm đáng chú ý

- `unreadCount` được **cache thủ công** thay vì dùng `notifications.filter(n => !n.read).length` để tránh tính toán O(n) mỗi lần render.
- Guard trong `markAsRead` là pattern tốt — Zustand sẽ **skip re-render** khi trả về cùng reference `state`.
