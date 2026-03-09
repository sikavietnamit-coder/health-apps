import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [currentApp, setCurrentApp] = useState('fitness');

  return (
    <div className="app">
      <div className="sidebar">
        <h2>💪 Health Apps</h2>
        <nav>
          <button className={currentApp === 'fitness' ? 'active' : ''} onClick={() => setCurrentApp('fitness')}>💪 Fitness Tracker</button>
          <button className={currentApp === 'meal' ? 'active' : ''} onClick={() => setCurrentApp('meal')}>🍽️ Meal Planner</button>
          <button className={currentApp === 'meditation' ? 'active' : ''} onClick={() => setCurrentApp('meditation')}>🧘 Meditation</button>
          <button className={currentApp === 'water' ? 'active' : ''} onClick={() => setCurrentApp('water')}>💧 Water Tracker</button>
          <button className={currentApp === 'habit' ? 'active' : ''} onClick={() => setCurrentApp('habit')}>🎯 Habit Builder</button>
        </nav>
      </div>

      <div className="content">
        {currentApp === 'fitness' && <FitnessTracker />}
        {currentApp === 'meal' && <MealPlanner />}
        {currentApp === 'meditation' && <Meditation />}
        {currentApp === 'water' && <WaterTracker />}
        {currentApp === 'habit' && <HabitBuilder />}
      </div>
    </div>
  );
}

function FitnessTracker() {
  const [workouts, setWorkouts] = useState(JSON.parse(localStorage.getItem('workouts')) || []);
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const addWorkout = () => {
    if (!exercise || !duration || !calories) { alert('Điền đầy đủ!'); return; }
    const newWorkout = { id: Date.now(), exercise, duration: parseInt(duration), calories: parseInt(calories), date: new Date().toLocaleDateString('vi-VN') };
    const updated = [newWorkout, ...workouts];
    setWorkouts(updated);
    localStorage.setItem('workouts', JSON.stringify(updated));
    setExercise(''); setDuration(''); setCalories('');
  };

  const deleteWorkout = (id) => { const filtered = workouts.filter(w => w.id !== id); setWorkouts(filtered); localStorage.setItem('workouts', JSON.stringify(filtered)); };
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <div className="app-container">
      <h1>💪 Fitness Tracker</h1>
      <p>Theo dõi tập luyện hàng ngày</p>
      <div className="stats">
        <div className="stat-card"><p className="stat-label">Tổng Workouts</p><p className="stat-value">{workouts.length}</p></div>
        <div className="stat-card"><p className="stat-label">Tổng Calo</p><p className="stat-value">{totalCalories}</p></div>
        <div className="stat-card"><p className="stat-label">Tổng Phút</p><p className="stat-value">{totalMinutes}</p></div>
      </div>
      <div className="form-box">
        <h2>Thêm Workout Mới</h2>
        <input type="text" placeholder="Tên bài tập" value={exercise} onChange={(e) => setExercise(e.target.value)} />
        <input type="number" placeholder="Thời gian (phút)" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <input type="number" placeholder="Calo đốt" value={calories} onChange={(e) => setCalories(e.target.value)} />
        <button onClick={addWorkout} className="btn-primary">➕ Lưu Workout</button>
      </div>
      <div className="list-box">
        <h2>Lịch Sử</h2>
        {workouts.length === 0 ? <p className="empty">Chưa có workout nào!</p> : <div className="list">{workouts.map((w) => (<div key={w.id} className="list-item"><div><h3>{w.exercise}</h3><p>📅 {w.date} | ⏱️ {w.duration} phút | 🔥 {w.calories} calo</p></div><button onClick={() => deleteWorkout(w.id)} className="btn-delete">❌</button></div>))}</div>}
      </div>
    </div>
  );
}

function MealPlanner() {
  const [meals, setMeals] = useState(JSON.parse(localStorage.getItem('meals')) || []);
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [calories, setCalories] = useState('');

  const addMeal = () => {
    if (!mealName || !calories) { alert('Điền đầy đủ!'); return; }
    const newMeal = { id: Date.now(), name: mealName, type: mealType, calories: parseInt(calories), date: new Date().toLocaleDateString('vi-VN') };
    const updated = [newMeal, ...meals];
    setMeals(updated);
    localStorage.setItem('meals', JSON.stringify(updated));
    setMealName(''); setCalories('');
  };

  const deleteMeal = (id) => { const filtered = meals.filter(m => m.id !== id); setMeals(filtered); localStorage.setItem('meals', JSON.stringify(filtered)); };
  const todayCalories = meals.filter(m => m.date === new Date().toLocaleDateString('vi-VN')).reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="app-container">
      <h1>🍽️ Meal Planner</h1>
      <p>Theo dõi ăn uống</p>
      <div className="stats">
        <div className="stat-card"><p className="stat-label">Calo Hôm Nay</p><p className="stat-value">{todayCalories}</p></div>
        <div className="stat-card"><p className="stat-label">Mục Tiêu</p><p className="stat-value">2000</p></div>
        <div className="stat-card"><p className="stat-label">Còn Lại</p><p className="stat-value">{Math.max(0, 2000 - todayCalories)}</p></div>
      </div>
      <div className="form-box">
        <h2>Thêm Bữa Ăn</h2>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="breakfast">Sáng</option>
          <option value="lunch">Trưa</option>
          <option value="dinner">Tối</option>
          <option value="snack">Ăn Vặt</option>
        </select>
        <input type="text" placeholder="Tên bữa ăn" value={mealName} onChange={(e) => setMealName(e.target.value)} />
        <input type="number" placeholder="Calo" value={calories} onChange={(e) => setCalories(e.target.value)} />
        <button onClick={addMeal} className="btn-primary">➕ Lưu</button>
      </div>
      <div className="list-box">
        <h2>Lịch Sử</h2>
        {meals.length === 0 ? <p className="empty">Chưa có!</p> : <div className="list">{meals.map((m) => (<div key={m.id} className="list-item"><div><h3>{m.type === 'breakfast' && '🌅'} {m.type === 'lunch' && '☀️'} {m.type === 'dinner' && '🌙'} {m.type === 'snack' && '🍿'} {m.name}</h3><p>📅 {m.date} | 🔥 {m.calories} calo</p></div><button onClick={() => deleteMeal(m.id)} className="btn-delete">❌</button></div>))}</div>}
      </div>
    </div>
  );
}

function Meditation() {
  const [sessions, setSessions] = useState(JSON.parse(localStorage.getItem('meditations')) || []);
  const [duration, setDuration] = useState('5');
  const [meditationType, setMeditationType] = useState('relaxation');

  const start = () => {
    const newSession = { id: Date.now(), type: meditationType, duration: parseInt(duration), date: new Date().toLocaleDateString('vi-VN') };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    localStorage.setItem('meditations', JSON.stringify(updated));
    alert(`✅ Hoàn thành ${duration} phút meditation!`);
  };

  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="app-container">
      <h1>🧘 Meditation & Sleep</h1>
      <p>Thư giãn</p>
      <div className="stats">
        <div className="stat-card"><p className="stat-label">Tổng Phút</p><p className="stat-value">{totalMinutes}</p></div>
        <div className="stat-card"><p className="stat-label">Sessions</p><p className="stat-value">{sessions.length}</p></div>
        <div className="stat-card"><p className="stat-label">Trạng Thái</p><p className="stat-value">😌</p></div>
      </div>
      <div className="form-box">
        <h2>Bắt Đầu</h2>
        <select value={meditationType} onChange={(e) => setMeditationType(e.target.value)}>
          <option value="relaxation">Thư Giãn</option>
          <option value="sleep">Ngủ</option>
          <option value="focus">Tập Trung</option>
        </select>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="5">5 phút</option>
          <option value="10">10 phút</option>
          <option value="15">15 phút</option>
          <option value="20">20 phút</option>
        </select>
        <button onClick={start} className="btn-primary">▶️ Bắt Đầu</button>
      </div>
      <div className="list-box">
        <h2>Lịch Sử</h2>
        {sessions.length === 0 ? <p className="empty">Chưa có!</p> : <div className="list">{sessions.map((s) => (<div key={s.id} className="list-item"><div><h3>{s.type === 'relaxation' && '😌'} {s.type === 'sleep' && '😴'} {s.type === 'focus' && '🎯'} {s.type}</h3><p>📅 {s.date} | ⏱️ {s.duration} phút</p></div></div>))}</div>}
      </div>
    </div>
  );
}

function WaterTracker() {
  const today = new Date().toLocaleDateString('vi-VN');
  const [waters, setWaters] = useState(JSON.parse(localStorage.getItem('waters')) || []);
  const todayWaters = waters.filter(w => w.date === today);
  const totalToday = todayWaters.reduce((sum, w) => sum + w.amount, 0);
  const goal = 2000;
  const percentage = Math.min(100, (totalToday / goal) * 100);

  const addWater = (amount) => {
    const newWater = { id: Date.now(), amount, date: today };
    const updated = [newWater, ...waters];
    setWaters(updated);
    localStorage.setItem('waters', JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      <h1>💧 Water Tracker</h1>
      <p>Uống đủ nước</p>
      <div className="stats">
        <div className="stat-card"><p className="stat-label">Hôm Nay</p><p className="stat-value">{totalToday}ml</p></div>
        <div className="stat-card"><p className="stat-label">Mục Tiêu</p><p className="stat-value">{goal}ml</p></div>
        <div className="stat-card"><p className="stat-label">%</p><p className="stat-value">{Math.round(percentage)}%</p></div>
      </div>
      <div className="progress-container">
        <div className="progress-bar"><div className="progress-fill" style={{ width: percentage + '%' }}></div></div>
        <p>{Math.round(percentage)}% hoàn thành</p>
      </div>
      <div className="form-box">
        <h2>Thêm Nước</h2>
        <div className="button-grid">
          <button onClick={() => addWater(250)} className="btn-secondary">250ml</button>
          <button onClick={() => addWater(500)} className="btn-secondary">500ml</button>
          <button onClick={() => addWater(1000)} className="btn-secondary">1L</button>
        </div>
      </div>
      <div className="list-box">
        <h2>Hôm Nay</h2>
        {todayWaters.length === 0 ? <p className="empty">Chưa có!</p> : <div className="list">{todayWaters.map((w) => (<div key={w.id} className="list-item"><p>💧 {w.amount}ml</p></div>))}</div>}
      </div>
    </div>
  );
}

function HabitBuilder() {
  const [habits, setHabits] = useState(JSON.parse(localStorage.getItem('habits')) || []);
  const [habitName, setHabitName] = useState('');

  const add = () => {
    if (!habitName) { alert('Nhập tên!'); return; }
    const newHabit = { id: Date.now(), name: habitName, completed: [], streak: 0 };
    const updated = [newHabit, ...habits];
    setHabits(updated);
    localStorage.setItem('habits', JSON.stringify(updated));
    setHabitName('');
  };

  const log = (id) => {
    const today = new Date().toDateString();
    const updated = habits.map(h => {
      if (h.id === id && !h.completed.includes(today)) {
        return { ...h, completed: [...h.completed, today], streak: h.streak + 1 };
      }
      return h;
    });
    setHabits(updated);
    localStorage.setItem('habits', JSON.stringify(updated));
  };

  const del = (id) => {
    const filtered = habits.filter(h => h.id !== id);
    setHabits(filtered);
    localStorage.setItem('habits', JSON.stringify(filtered));
  };

  return (
    <div className="app-container">
      <h1>🎯 Habit Builder</h1>
      <p>Xây dựng thói quen</p>
      <div className="form-box">
        <h2>Tạo Thói Quen</h2>
        <input type="text" placeholder="Tên thói quen" value={habitName} onChange={(e) => setHabitName(e.target.value)} />
        <button onClick={add} className="btn-primary">➕ Thêm</button>
      </div>
      <div className="list-box">
        <h2>Thói Quen</h2>
        {habits.length === 0 ? <p className="empty">Chưa có!</p> : <div className="list">{habits.map((h) => {
          const today = new Date().toDateString();
          const done = h.completed.includes(today);
          return (
            <div key={h.id} className="habit-card">
              <div><h3>{h.name}</h3><p>🔥 {h.streak} | 📊 {h.completed.length}</p></div>
              <button onClick={() => log(h.id)} disabled={done} className={done ? 'btn-done' : 'btn-secondary'}>{done ? '✅' : 'Log'}</button>
              <button onClick={() => del(h.id)} className="btn-delete-small">❌</button>
            </div>
          );
        })}</div>}
      </div>
    </div>
  );
}
