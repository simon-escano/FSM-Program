class Display {
    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.tile_sheet = new TileSheet(64, 6);
    }

    drawMap(map, columns) {
        for (let index = map.length - 1; index > -1; --index) {
            let value = map[index] - 1;
            let source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let destination_x = (index % columns) * this.tile_sheet.tile_size;
            let destination_y = Math.floor(index / columns) * this.tile_sheet.tile_size;
            this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size);
        }
    }

    drawPlayer(rectangle, tileIndex) {
        let value = tileIndex - 1;
        let source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
        let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
        this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, Math.floor(rectangle.x), Math.floor(rectangle.y), rectangle.width, rectangle.height);
    }

    resize() {
        const container = document.getElementById('container');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const height_width_ratio = this.buffer.canvas.height / this.buffer.canvas.width;

        if (containerHeight / containerWidth > height_width_ratio) {
            this.context.canvas.width = containerWidth;
            this.context.canvas.height = containerWidth * height_width_ratio;
        } else {
            this.context.canvas.height = containerHeight;
            this.context.canvas.width = containerHeight / height_width_ratio;
        }
        this.context.imageSmoothingEnabled = false;
    }

    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
}

class TileSheet {
    constructor(tile_size, columns) {
        this.image = new Image();
        this.tile_size = tile_size;
        this.columns = columns;
    }
}