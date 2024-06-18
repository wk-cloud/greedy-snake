// 蛇类
export class Snake {
	// 蛇容器元素
	element: HTMLElement;
	// 蛇头元素
	head: HTMLElement;
	// 蛇的身体
	body: HTMLCollection;

	constructor() {
		this.element = document.getElementById('snake')!;
		this.head = document.querySelector('#snake > div')!;
		this.body = this.element.getElementsByTagName('div');
	}

	// 获取蛇的坐标
	get headX() {
		return this.head.offsetLeft;
	}
	get headY() {
		return this.head.offsetTop;
	}

	// 设置蛇头的坐标
	set headX(value) {
		if (this.headX === value) {
			return;
		}
		// 判断蛇是否撞墙
		if (value < 0 || value > 290) {
			throw new Error('蛇撞墙了，游戏结束！');
		}

		// 如果蛇有了身体，就不能向反方向移动
		if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value){
			// 如果发生了掉头，让蛇向反方向继续移动
			if(value > this.headX){
				value = this.headX - 10;
			}else {
				value = this.headX + 10;
			}
		}

		// 移动身体
		this.moveBody();

		// 移动头部
		this.head.style.left = value + 'px';

		// 判断蛇是否撞到自己
		this.checkHeadBody();
	}

	set headY(value) {
		if (this.headY === value) {
			return;
		}
		// 判断蛇是否撞墙
		if (value < 0 || value > 290) {
			throw new Error('蛇撞墙了，游戏结束！');
		}

		// 如果蛇有了身体，就不能向反方向移动
		if(this.body[1] && (this.body[1] as HTMLElement).offsetTop === value){
			// 如果发生了掉头，让蛇向反方向继续移动
			if(value > this.headY){
				value = this.headY - 10;
			}else {
				value = this.headY + 10;
			}
		}

		// 移动身体
		this.moveBody();
		// 移动头部
		this.head.style.top = value + 'px';
		// 判断蛇是否撞到自己
		this.checkHeadBody();
	}

	// 蛇增加身体
	addBody(): void {
		// 向蛇容器最后添加一个div
		this.element.insertAdjacentHTML('beforeend', '<div id="snake-item"></div>');
	}

	// 蛇身体移动
	moveBody(): void {
		// 将后边的身体设置为前边身体的位置
		for (let i = this.body.length - 1; i > 0; i--) {
			// 获取当前身体的位置
			let X = (this.body[i - 1] as HTMLElement).offsetLeft;
			let Y = (this.body[i - 1] as HTMLElement).offsetTop;
			// 将值设置到当前身体上
			(this.body[i] as HTMLElement).style.left = X + 'px';
			(this.body[i] as HTMLElement).style.top = Y + 'px';
		}
	}

	// 检查蛇头是否碰撞自己身体
	checkHeadBody(){
		// 获取所有身体，检查是否和蛇头坐标发生重叠
		for(let i = 1; i < this.body.length ; i++){
			let body = this.body[i] as HTMLElement;
			if(this.headX === body.offsetLeft && this.headY === body.offsetTop){
				throw new Error('蛇撞到自己了，游戏结束！');
			}
		}
	}

	// 检查食物位置是否在蛇身上
	checkFoodOnSnakeBody(x: number,y: number){
		for(let i = 0; i < this.body.length ; i++){
			const body = this.body[i] as HTMLElement;
		    if(body.offsetLeft === x && body.offsetTop === y){
				return true;
			}
		}
		return false;
	}
}