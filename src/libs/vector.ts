export class Vector2 {

    public x: number;
    public y: number;
    
    constructor(_x?: number, _y?: number) 
    {
        this.x = _x ?? 0;
        this.y = _y ?? 0;
    }
}

export function getDistance(a: Vector2, b: Vector2) {
    var m_vector = new Vector2(a.x - b.x, a.y - b.y);
  
    return Math.sqrt(Math.pow(m_vector.x, 2) + Math.pow(m_vector.y, 2));
  }
  