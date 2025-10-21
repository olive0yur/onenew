<template>
  <div class="globe-container">
    <canvas ref="globeCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const globeCanvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let points: [number, number][] = [];
let projection: any = null;
let animationId: number = 0;

const initCanvas = () => {
  if (!globeCanvas.value) return;
  
  const canvas = globeCanvas.value;
  const container = canvas.parentElement;
  if (!container) return;
  
  // 设置canvas尺寸为容器尺寸
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  projection = d3.geoOrthographic()
    .scale(Math.min(canvas.width, canvas.height) * 0.5)
    .translate([canvas.width / 2, canvas.height / 1.8]);
};

const loadAndRender = async () => {
  if (!globeCanvas.value) return;
  
  ctx = globeCanvas.value.getContext('2d');
  if (!ctx) return;

  try {
    const world: any = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const land = topojson.feature(world, (world as any).objects.countries);

    // 稀疏点阵采样 - 增大间隔减少点数
    (land as any).features.forEach((f: any) => {
      const bounds = d3.geoBounds(f);
      for (let lon = bounds[0][0]; lon < bounds[1][0]; lon += 2.5) {
        for (let lat = bounds[0][1]; lat < bounds[1][1]; lat += 2.5) {
          const p: [number, number] = [lon, lat];
          if (d3.geoContains(f, p)) points.push(p);
        }
      }
    });

    let r = 0;
    let ringRotation = 0;

    const render = (rotation: number) => {
      if (!ctx || !globeCanvas.value || !projection) return;
      
      ctx.clearRect(0, 0, globeCanvas.value.width, globeCanvas.value.height);
      projection.rotate([rotation, -20]);
      const radius = projection.scale();
      const center = projection.translate();

      // 绘制地球轮廓
      ctx.beginPath();
      ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(200,200,200,0)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 绘制外层旋转圆环
      const ringRadius = radius * 1.06;
      const gapAngle = Math.PI / 12;
      const startAngle = gapAngle;
      const endAngle = 2 * Math.PI - gapAngle;

      ctx.save();
      ctx.translate(center[0], center[1]);
      ctx.rotate((ringRotation * Math.PI) / 180);

      const segments = 100;
      const angleRange = endAngle - startAngle;

      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const angle1 = startAngle + t * angleRange;
        const angle2 = startAngle + (t + 1 / segments) * angleRange;

        const widthStart = 5 - 1.5 * Math.min(t, 1 - t) * 4;
        const lineWidth = Math.max(1.5, widthStart);

        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, angle1, angle2);
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      ctx.restore();

      // 绘制点阵陆地 - 优化性能，使用简单圆点替代渐变
      points.forEach(p => {
        const xy = projection(p);
        if (!xy) return;

        const dx = xy[0] - center[0];
        const dy = xy[1] - center[1];
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        // 只绘制正面的点（背面不绘制）
        if (distFromCenter > radius) return;

        const frontness = Math.max(0, 1 - (distFromCenter / radius) * 0.9);
        const latWeight = 1 + Math.abs(p[1]) / 90 * 0.8;
        const alpha = (0.5 + 0.75 * frontness) * latWeight;
        const size = 1.2 + 0.5 * alpha;

        // 使用简单的实心圆替代渐变，大幅提升性能
        ctx!.beginPath();
        ctx!.arc(xy[0], xy[1], size, 0, 2 * Math.PI);
        ctx!.fillStyle = `rgba(255,255,255,${Math.min(1, alpha)})`;
        ctx!.fill();
      });
    };

    const animate = () => {
      r += 0.15;
      ringRotation += 0.4;
      render(r);
      animationId = requestAnimationFrame(animate);
    };

    animate();
  } catch (error) {
    console.error('加载地球数据失败:', error);
  }
};

const handleResize = () => {
  initCanvas();
};

onMounted(() => {
  initCanvas();
  loadAndRender();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.globe-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
}

canvas {
  display: block;
}
</style>

