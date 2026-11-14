// Hero demo: draws the dancer's skeleton from the app's own pose track and shows example ratings.
(function () {
  var c = document.getElementById('demo'), P = window.DM_POSE;
  if (!c || !P) return;
  var g = c.getContext('2d'), W = c.width, H = c.height, F = P.f, n = F.length;
  // nose, neck, lShoulder, rShoulder, lElbow, rElbow, lWrist, rWrist, lHip, rHip, lKnee, rKnee, lAnkle, rAnkle, root
  var bones = [[1,2],[1,3],[2,4],[4,6],[3,5],[5,7],[1,14],[8,9],[8,10],[10,12],[9,11],[11,13]];
  var ratingEl = document.getElementById('rating'), scoreEl = document.getElementById('score'), beatsEl = document.getElementById('beats');
  var seq = ['Perfect','Perfect','Good','Perfect','Perfect','Good','Perfect','Miss','Perfect','Good','Perfect','Perfect'];
  var credit = { Perfect: 1, Good: 0.7, Miss: 0 }, color = { Perfect: '#2FBF71', Good: '#F5B82E', Miss: '#E4484E' };
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function pt(a, b, k, j) {
    var ax = a[j*2], ay = a[j*2+1], bx = b[j*2], by = b[j*2+1];
    if (ax < 0 || ay < 0) return null;
    if (bx < 0 || by < 0) { bx = ax; by = ay; }
    return [(ax + (bx - ax) * k) / 999 * W, (ay + (by - ay) * k) / 999 * H];
  }
  function draw(t) {
    var x = (t * P.fps) % n, i = Math.floor(x), k = x - i, a = F[i], b = F[(i + 1) % n];
    if (i === n - 1) k = 0;
    g.clearRect(0, 0, W, H);
    var floor = g.createRadialGradient(W/2, H*0.93, 10, W/2, H*0.93, W*0.6);
    floor.addColorStop(0, 'rgba(109,99,245,.35)'); floor.addColorStop(1, 'rgba(109,99,245,0)');
    g.fillStyle = floor; g.fillRect(0, H*0.7, W, H*0.3);
    g.lineCap = 'round'; g.lineJoin = 'round';
    g.shadowColor = 'rgba(138,130,255,.9)'; g.shadowBlur = 26;
    g.strokeStyle = '#8A82FF'; g.lineWidth = 13;
    for (var m = 0; m < bones.length; m++) {
      var p = pt(a, b, k, bones[m][0]), q = pt(a, b, k, bones[m][1]);
      if (!p || !q) continue;
      g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke();
    }
    var nose = pt(a, b, k, 0), neck = pt(a, b, k, 1);
    if (nose && neck) {
      var r = Math.max(26, Math.hypot(nose[0]-neck[0], nose[1]-neck[1]) * 0.62);
      g.fillStyle = '#F1F0FA'; g.beginPath(); g.arc(nose[0], nose[1], r, 0, 6.2832); g.fill();
    }
    g.shadowBlur = 0; g.fillStyle = '#F1F0FA';
    for (var j = 2; j < 14; j++) { var d = pt(a, b, k, j); if (d) { g.beginPath(); g.arc(d[0], d[1], 6, 0, 6.2832); g.fill(); } }
  }

  var beat = -1, total = 0, count = 0;
  function onBeat(bi) {
    if (bi % seq.length === 0) { total = 0; count = 0; beatsEl.innerHTML = ''; }
    var r = seq[bi % seq.length];
    total += credit[r]; count++;
    scoreEl.textContent = Math.round(100 * total / count);
    ratingEl.textContent = r; ratingEl.style.color = color[r];
    ratingEl.classList.remove('pop'); void ratingEl.offsetWidth; ratingEl.classList.add('pop');
    var dot = document.createElement('i'); dot.style.background = color[r]; beatsEl.appendChild(dot);
  }
  if (still) { draw(2.2); scoreEl.textContent = '92'; ratingEl.textContent = 'Perfect'; ratingEl.style.color = color.Perfect; ratingEl.classList.add('pop'); return; }
  var t0 = null;
  function tick(ms) {
    if (t0 === null) t0 = ms;
    var t = (ms - t0) / 1000; draw(t);
    var bi = Math.floor(t / 0.75);
    if (bi !== beat) { beat = bi; onBeat(bi); }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
