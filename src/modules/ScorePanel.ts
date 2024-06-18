// 计分类
export class ScorePanel {
	// 分数和等级
	private score = 0;
	private level = 1;
	// 分数和等级的dom元素，在构造函数中进行初始化
	private scoreElement: HTMLElement;
	private levelElement: HTMLElement;
	// 等级的上限
	private maxLevel;
	// 升级的阈值
	private upScore: number;

	constructor(maxLevel: number = 10,upScore: number = 10) {
		this.maxLevel = maxLevel;
		this.upScore = upScore;
		this.scoreElement = document.getElementById('score')!;
		this.levelElement = document.getElementById('level')!;
	}

	getScore(): number {
		return this.score;
	}

	setScore(): void {
		this.score += 1;
		this.scoreElement.innerHTML = this.score.toString();
		// 判断分数是否达到升级阈值
		if(this.score % this.upScore === 0){
		    this.setLevel();
		}
	}

	getLevel(): number {
	    return this.level;
	}

	setLevel(): void {
		this.level += 1;
		if(this.level >= this.maxLevel){
			this.level = this.maxLevel;
		}
		this.levelElement.innerHTML = this.level.toString();
	}
}