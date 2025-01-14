document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".main_boxlist");
    const boxes = document.querySelectorAll(".group_box");

    let isDragging = false;
    let startY;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Handle drag start
    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.clientY;
        carousel.style.cursor = "grabbing";
    });

    // Handle drag move
    carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const distance = e.clientY - startY;
        currentTranslate = prevTranslate + distance;
        updateCarouselPosition();
    });

    // Handle drag end
    carousel.addEventListener("mouseup", () => {
        isDragging = false;
        prevTranslate = currentTranslate;
        carousel.style.cursor = "grab";
        snapToClosestBox();
    });

    // Snap to the closest group_box
    function snapToClosestBox() {
        let closestIndex = 0;
        let closestOffset = Infinity;
        boxes.forEach((box, index) => {
            const boxOffset = Math.abs(currentTranslate - box.offsetTop);
            if (boxOffset < closestOffset) {
                closestOffset = boxOffset;
                closestIndex = index;
            }
        });
        currentTranslate = -boxes[closestIndex].offsetTop;
        prevTranslate = currentTranslate;
        updateActiveClass(closestIndex);
        updateCarouselPosition();
    }

    // Update the active class
    function updateActiveClass(index) {
        boxes.forEach((box, i) => {
            box.classList.toggle("active", i === index);
        });
    }

    // Update the carousel position
    function updateCarouselPosition() {
        carousel.style.transform = `translateY(${currentTranslate}px)`;
    }

    // Handle touch events (for mobile)
    carousel.addEventListener("touchstart", (e) => {
        isDragging = true;
        startY = e.touches[0].clientY;
    });

    carousel.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const distance = e.touches[0].clientY - startY;
        currentTranslate = prevTranslate + distance;
        updateCarouselPosition();
    });

    carousel.addEventListener("touchend", () => {
        isDragging = false;
        prevTranslate = currentTranslate;
        snapToClosestBox();
    });
});
