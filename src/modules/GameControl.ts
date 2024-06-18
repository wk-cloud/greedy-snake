// 引入食物类
import { Food } from './Food'
// 引入评分类
import { ScorePanel } from './ScorePanel'
//  引入蛇类
import { Snake } from './Snake'
// 游戏控制器
export class GameControl {

	private snake: Snake;

	private food: Food;

	private scorePanel: ScorePanel;

	// 创建一个属性来存储蛇的移动方向（也就是按键的方向）
	private direction: string = '';

	// 控制蛇移动的按键范围
	private readonly keyRange: Array<string> = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

	// 创建一个属性来记录游戏是否结束
	private isLive = true;

	constructor(maxLevel: number = 10, upScore: number = 2) {
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel(maxLevel, upScore);
		this.init();
	}

	// 初始化游戏
	init(): void {
		// 绑定键盘按下事件，并修改this指向GameControl
		document.addEventListener('keydown', this.keydownHandler.bind(this));
		// 调用run方法，使蛇移动
		this.run();
	}

	// 键盘按下的响应函数
	keydownHandler(event: KeyboardEvent): void {
		if (this.keyRange.includes(event.key)) {
			this.direction = event.key;
		}
	}

	// 控制蛇的移动
	run(): void {
		// 获取蛇的坐标
		let X = this.snake.headX;
		let Y = this.snake.headY;
		switch (this.direction) {
			case 'ArrowUp':
				Y -= 10;
				break;
			case 'ArrowDown':
				Y += 10;
				break;

			case 'ArrowLeft':
				X -= 10;
				break;

			case 'ArrowRight':
				X += 10;
				break;
		}

		// 判断蛇是否吃到食物
		this.isEat(X, Y);
		// 修改蛇的坐标
		try {
			this.snake.headX = X;
			this.snake.headY = Y;
		} catch (e: any) {
			alert(e.message);
			this.isLive = false;
		}
		// 开启一个定时调用
		this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.getLevel() - 1) * 30);
	}

	// 判断蛇是否吃到食物
	isEat(x: number, y: number): void {
		if (x === this.food.getFoodX() && y === this.food.getFoodY()) {
			// 食物重新分配位置
			this.food.createFoodLocation(this.snake);
			// 分数增加
			this.scorePanel.setScore();
			// 蛇增加身体
			this.snake.addBody();
		}
	}

	// 蛇增加身体
	addBody(): void {
		this.snake.addBody();
	}

	getSnake(): Snake {
		return this.snake;
	}

	getFood(): Food {
		return this.food;
	}

	getScorePanel(): ScorePanel {
		return this.scorePanel;
	}

	getDirection(): string {
		return this.direction;
	}

}