import { Snake } from "./Snake";

// 食物类
export class Food {
	// 定义一个属性来表示食物所对应的元素
	private element: HTMLElement;
	constructor() {
		// 获取页面中的food元素
		this.element = document.getElementById('food')!;
	}

	// 获取食物元素
	getElement(): HTMLElement {
		return this.element;
	}

	// 获取食物的水平坐标
	getFoodX(): number {
		return this.element.offsetLeft;
	}

	// 获取食物的垂直坐标
	getFoodY(): number {
		return this.element.offsetTop;
	}

	// 生成食物位置
	createFoodLocation(snake: Snake): void {
		// 食物的位置：最小值是0，最大值是290
		// 蛇移动一次的距离是一个，一格的大小是10，所以食物的位置得是10的整数倍

		// 食物偏移量
		const offsetLeft: number = Math.round(Math.random() * 29) * 10;
		const offsetTop: number = Math.round(Math.random() * 29) * 10;

		// 判断食物是否在蛇的身体上
		if (snake.checkFoodOnSnakeBody(offsetLeft, offsetTop)) {
			console.log('====> 食物出现在蛇的身体上了');
		    this.createFoodLocation(snake);
		}

		// 设置食物的位置
		this.element.style.left = offsetLeft + 'px';
		this.element.style.top = offsetTop + 'px';

	}

}