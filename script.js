   // ===== Utilidades =====
    const parseArray = (str) => {
      if (!str || !str.trim()) return [];
      return str.split(/[,\s]+/).filter(Boolean).map(v => {
          // convierte a número si corresponde
          const num = Number(v);
          return Number.isFinite(num) && /^[-+]?\d*(?:\.\d+)?$/.test(v) ? num : v;
        });
    };

    const fmtArray = (arr) => `[${arr.map(v => typeof v === 'string' ? `'${v}'` : String(v)).join(', ')}]`;

    // 4a
    function sumArray(arr){
      return arr.reduce((acc, cur) => acc + (typeof cur === 'number' ? cur : 0), 0);
    }
    function handleSum(){
      const arr = parseArray(document.getElementById('arr4a').value);
      const sum = sumArray(arr);
      document.getElementById('out4a').textContent = `Entrada: ${fmtArray(arr)}\nSuma: ${sum}`;
    }

    // 4b
    function monthInfo(mes, anio){
      const nombres = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      if (mes < 1 || mes > 12) throw new Error('Mes debe estar entre 1 y 12');
      const nombre = nombres[mes - 1];
      const dias = new Date(anio, mes, 0).getDate(); // día 0 del siguiente mes
      return { nombre, dias };
    }
    function handleMonthInfo(){
      try{
        const mes = Number(document.getElementById('mes4b').value);
        const anio = Number(document.getElementById('anio4b').value);
        const {nombre, dias} = monthInfo(mes, anio);
        document.getElementById('out4b').textContent = `${nombre} de ${anio} tiene ${dias} días.`;
      }catch(e){
        document.getElementById('out4b').textContent = e.message;
      }
    }

    // 6
    function maxInArray(arr){
      const nums = arr.filter(v => typeof v === 'number');
      if (nums.length === 0) return null;
      return nums.reduce((m, v) => v > m ? v : m, nums[0]);
    }
    function handleMaxArray(){
      const arr = parseArray(document.getElementById('arr6').value);
      const m = maxInArray(arr);
      document.getElementById('out6').textContent = `Entrada: ${fmtArray(arr)}\nMáximo: ${m}`;
    }

    // 8a
    function diffDays(fecha1, fecha2){
      const MS = 24*60*60*1000;
      const f1 = new Date(fecha1), f2 = new Date(fecha2);
      if (isNaN(f1) || isNaN(f2)) return NaN;
      const utc1 = Date.UTC(f1.getFullYear(), f1.getMonth(), f1.getDate());
      const utc2 = Date.UTC(f2.getFullYear(), f2.getMonth(), f2.getDate());
      return Math.abs(Math.round((utc2 - utc1) / MS));
    }
    function handleDiffDays(){
      const f1 = document.getElementById('f1').value;
      const f2 = document.getElementById('f2').value;
      const d = diffDays(f1, f2);
      document.getElementById('out8a').textContent = Number.isNaN(d) ? 'Introduce dos fechas válidas.' : `${d} día(s)`;
    }

    // 18
    function productArray(arr){
      const nums = arr.filter(v => typeof v === 'number');
      if (nums.length === 0) return 0;
      return nums.reduce((acc, v) => acc * v, 1);
    }
    function handleProduct(){
      const arr = parseArray(document.getElementById('arr18').value);
      const p = productArray(arr);
      document.getElementById('out18').textContent = `Entrada: ${fmtArray(arr)}\nProducto: ${p}`;
    }

    // 31 (a)
    function maxOfThree(a,b,c){
      return Math.max(a,b,c);
    }
    function handleMaxOfThree(){
      const a = Number(document.getElementById('n1').value);
      const b = Number(document.getElementById('n2').value);
      const c = Number(document.getElementById('n3').value);
      const m = maxOfThree(a,b,c);
      document.getElementById('out31a').textContent = `Mayor: ${m}`;
    }

    // 5
    function joinArray(arr, sep=','){ return arr.join(sep); }
    function handleJoin(){
      const arr = parseArray(document.getElementById('arr5').value);
      const sep = document.getElementById('sep5').value;
      const out = joinArray(arr, sep);
      document.getElementById('out5').textContent = out;
    }

    // 8b
    function mostFrequent(arr){
      if (arr.length === 0) return { valor:null, frecuencia:0 };
      const map = new Map();
      for (const v of arr){ map.set(v, (map.get(v)||0)+1); }
      let bestVal = null, bestCount = 0;
      for (const [k,c] of map){ if (c > bestCount){ bestVal = k; bestCount = c; } }
      return { valor: bestVal, frecuencia: bestCount };
    }
    function handleMostFrequent(){
      const arr = parseArray(document.getElementById('arr8b').value);
      const {valor, frecuencia} = mostFrequent(arr);
      document.getElementById('out8b').textContent = `Más frecuente: ${valor} (Veces que aparece ${frecuencia})`;
    }

    // 31 (b)
    function removeElement(arr, val){
      return arr.filter(v => v !== (Number(val).toString() === val ? Number(val) : val));
    }
    function handleRemoveElement(){
      const arr = parseArray(document.getElementById('arr31b').value);
      const valRaw = document.getElementById('val31b').value.trim();
      // Intentar convertir a número si es numérico puro
      const val = /^[-+]?\d*(?:\.\d+)?$/.test(valRaw) && valRaw !== '' ? Number(valRaw) : valRaw;
      const out = removeElement(arr, val);
      document.getElementById('out31b').textContent = `Original: ${fmtArray(arr)}\nRemoviendo: ${typeof val === 'string' ? `'${val}'` : val}\nResultado: ${fmtArray(out)}`;
    }

    // Valores por defecto útiles
    (function initDefaults(){
      const today = new Date();
      const y = today.getFullYear();
      const pad = n => String(n).padStart(2,'0');
      const toISO = (d)=> `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
      document.getElementById('f1').value = toISO(new Date(y, 0, 1));
      document.getElementById('f2').value = toISO(new Date(y, 0, 31));
      document.getElementById('arr4a').focus();
    })();